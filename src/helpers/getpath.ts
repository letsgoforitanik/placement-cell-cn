import path from "path";

// returns absolute path
export default function getPath(...paths: string[]) {
    return path.join(process.cwd(), ...paths);
}