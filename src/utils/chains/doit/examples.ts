export const doItExampleList: Array<{
  input: string;
  output: string;
}> = [
  {
    input: 'echo hoge',
    output: 'echo hoge',
  },
  {
    input: 'show files and directories',
    output: 'ls -alh',
  },
  {
    input: 'create temporary directory',
    output: 'mkdir -p tmp',
  },
  {
    input: 'show hello world using docker',
    output: `docker run hello-world`,
  },
  {
    input: 'show hello world using docker, Ubuntu 22.04',
    output: "docker run ubuntu:22.04 /bin/echo 'Hello world'",
  },
  {
    input: 'initialize vite project with react and typescript template',
    output: `npm create vite@latest my-vite-project --template react-ts
cd my-vite-project && npm install`,
  },
  {
    input: 'add npm packages for react-map-gl',
    output: 'npm install react-map-gl maplibre-gl pmtiles',
  },
  {
    input: 'upgrade system node.js to latest version',
    output: `curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install nodejs -y`,
  },
  {
    input: 'build this project',
    output: 'npm run build',
  },
  {
    input: 'build and test this project',
    output: `npm run build
npm run test`,
  },
  {
    input: 'install gdal by apt',
    output: 'sudo apt-get install gdal-bin -y',
  },
  {
    input: 'git commit all changes with comment hoge',
    output: `git add .
git commit -m 'hoge'`,
  },
  {
    input: 'git push',
    output: 'git push 2>&1',
  },
  {
    input: 'git pull',
    output: 'git pull 2>&1',
  },
  {
    input: 'git push with comment hoge',
    output: `git add .
git commit -m 'hoge'
git push 2>&1`,
  },
  {
    input: 'update all apt packages',
    output: `apt-get update 2>&1
apt-get upgrade -y
apt-get autoremove -y`,
  },
];

