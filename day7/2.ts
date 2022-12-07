import * as fs from "fs";

const input: string = fs.readFileSync("day7/input.txt", "utf8");

interface File {
  name: string;
  size: number;
}
interface Directory {
  name: string;
  children: (File | Directory)[];
  parent?: Directory;
}

const processDirectoryInput = (input: string) => {
  let currentDirectory: Directory = {
    name: "/",
    children: [],
  };

  let directories: Directory[] = [currentDirectory];

  const changeDirectory = (directoryName: string) => {
    if (directoryName === "/") {
      currentDirectory = directories[0];
      return;
    }
    if (directoryName === "..") {
      currentDirectory = currentDirectory.parent as Directory;
      return;
    }

    currentDirectory = currentDirectory.children.find(
      (child) => child.name === directoryName
    ) as Directory;
  };

  const addDirectory = (name: string) => {
    currentDirectory.children.push({
      parent: currentDirectory,
      name,
      children: [],
    });
  };

  const addFile = (file: File) => {
    currentDirectory.children.push(file);
  };

  input.split("\n").forEach((line) => {
    const isCommand = line.startsWith("$");
    if (isCommand) {
      const command = line.split(" ")[1];
      if (command === "cd") {
        changeDirectory(line.split(" ")[2]);
      }
      return;
    }

    // ls output is only other option
    if (line.split(" ")[0] === "dir") {
      addDirectory(line.split(" ")[1]);
      return;
    }
    addFile({ size: parseInt(line.split(" ")[0]), name: line.split(" ")[1] });
  });

  return directories;
};

let directorySizes: number[] = [];
const calculateDirectorySize = (directory: Directory) => {
  if (directory.children.length === 0) {
    return 0;
  }

  return directory.children.reduce((acc, child) => {
    if (child.hasOwnProperty("children")) {
      const directorySize = calculateDirectorySize(child as Directory);
      directorySizes.push(directorySize);
      return directorySize + acc;
    }

    return (child as File).size + acc;
  }, 0);
};

const directories = processDirectoryInput(input);
const rootDirectorySize = calculateDirectorySize(directories[0]);
directorySizes.push(rootDirectorySize);

const TOTAL_DISK_SIZE = 70000000;
const SPACE_NEEDED = 30000000;

const maxDirectorySize = SPACE_NEEDED - (TOTAL_DISK_SIZE - rootDirectorySize);

const smallestDirectorySize = directorySizes
  .filter((size) => size >= maxDirectorySize)
  .reduce((acc, size) => Math.min(acc, size), Infinity);

console.log(smallestDirectorySize);
