"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const packageJsonPath = (0, path_1.join)(__dirname, "../package.json");
const packageJson = JSON.parse((0, fs_1.readFileSync)(packageJsonPath, "utf8"));
exports.version = packageJson.version;
