import path from "path";

export default function getPath(...paths: string[]) {
    return path.join(process.cwd(), ...paths);
}