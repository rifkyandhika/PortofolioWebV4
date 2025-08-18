import fs from "fs";
import { promisify } from "util";
import path from "path";
const readFile = promisify(fs.readFile);

export async function readProjectsJson() {
	// Cek dua kemungkinan lokasi: "src/data/projects.json" dan "data/projects.json"
	const candidates = [
		path.resolve(process.cwd(), "src", "data", "projects.json"),
		path.resolve(process.cwd(), "data", "projects.json"),
		path.resolve(process.cwd(), "projects.json"),
	];

	for (const jsonPath of candidates) {
		try {
			// Cek apakah file ada sebelum membaca
			await fs.promises.access(jsonPath, fs.constants.R_OK);
			const raw = await readFile(jsonPath, "utf-8");
			return JSON.parse(raw);
		} catch (err) {
			// Jika file tidak ada atau baca gagal, lanjut ke kandidat berikutnya
			// (tidak console.error setiap kali agar log tidak penuh)
			console.log(`readProjectsJson: Failed to read ${jsonPath}`, err);
		}
	}

	// Jika tidak ditemukan di kandidat manapun, log sekali dan kembalikan array kosong
	console.error(
		"readProjectsJson: projects.json not found in expected locations:",
		candidates
	);
	return [];
}