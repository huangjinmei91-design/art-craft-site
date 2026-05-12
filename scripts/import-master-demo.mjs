import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const inputPath = path.join(projectRoot, "data/demo/artcraft-master.csv");
const outputPath = path.join(projectRoot, "src/data/generated/master-content.json");

function parseCsv(source) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        field += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }

      row.push(field);
      field = "";

      if (row.some((item) => item.trim() !== "")) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((item) => item.trim() !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

function toRecords(rows) {
  const [headers, ...dataRows] = rows;

  return dataRows.map((values, rowIndex) => {
    const entry = {};

    headers.forEach((header, columnIndex) => {
      entry[header] = (values[columnIndex] ?? "").trim();
    });

    if (!entry.record_type) {
      throw new Error(`第 ${rowIndex + 2} 行缺少 record_type。`);
    }

    if (!entry.slug) {
      throw new Error(`第 ${rowIndex + 2} 行缺少 slug。`);
    }

    if (!entry.title_zh_hans) {
      throw new Error(`第 ${rowIndex + 2} 行缺少 title_zh_hans。`);
    }

    if (entry.record_type === "object") {
      if (!entry.accession_number) {
        throw new Error(`第 ${rowIndex + 2} 行 object 缺少 accession_number。`);
      }

      if (!entry.hero_image) {
        throw new Error(`第 ${rowIndex + 2} 行 object 缺少 hero_image。`);
      }
    }

    if (entry.record_type === "timeline" && !entry.hero_image) {
      throw new Error(`第 ${rowIndex + 2} 行 timeline 缺少 hero_image。`);
    }

    if (entry.record_type === "term" && !entry.term_type) {
      throw new Error(`第 ${rowIndex + 2} 行 term 缺少 term_type。`);
    }

    return entry;
  });
}

async function main() {
  const csv = await fs.readFile(inputPath, "utf8");
  const rows = parseCsv(csv);

  if (rows.length < 2) {
    throw new Error("没有找到可导入的 master 数据。");
  }

  const records = toRecords(rows);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(records, null, 2)}\n`, "utf8");

  console.log(`Imported ${records.length} master records -> ${path.relative(projectRoot, outputPath)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
