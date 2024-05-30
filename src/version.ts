import { readFileSync } from "fs";
import { join } from "path";

// Define the path to package.json
const packageJsonPath = join(__dirname, "../package.json");

// Read and parse package.json
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

// Extract the version
export const version = packageJson.version;
