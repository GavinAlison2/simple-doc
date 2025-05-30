const { spawn } = require('child_process');

// 使用 spawn 执行 'ls' 命令（在 Unix/Linux 系统上）
// 在 Windows 系统上，可以将 'ls' 替换为 'dir'
// const child = spawn('ls', ['-lh', '/usr']); // 这里可以替换成你要执行的命令和参数
// const child = spawn('dir', []); // 这里可以替换成你要执行的命令和参数
const cmd = 'C:\\WINDOWS\\system32\\cmd.exe';
const args = ['/d', '/s', '/c', 'npm install --verbose'];
const opts = {
    "cwd": '"D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend"',
    "env": {
        ALLUSERSPROFILE: "C:\\ProgramData",
        APPCODE_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\appcode.vmoptions",
        APPDATA: "C:\\Users\\Administrator\\AppData\\Roaming",
        "asl.log": "Destination=file",
        CHROME_CRASHPAD_PIPE_NAME: "\\\\.\\pipe\\crashpad_10504_TYVIPHOXJZDQZGVT",
        CLION_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\clion.vmoptions",
        COLOR: "0",
        COLORTERM: "truecolor",
        CommonProgramFiles: "C:\\Program Files\\Common Files",
        "CommonProgramFiles(x86)": "C:\\Program Files (x86)\\Common Files",
        CommonProgramW6432: "C:\\Program Files\\Common Files",
        COMPUTERNAME: "HUAWEIP40",
        ComSpec: "C:\\WINDOWS\\system32\\cmd.exe",
        DATAGRIP_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\datagrip.vmoptions",
        DATASPELL_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\dataspell.vmoptions",
        DEVECOSTUDIO_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\devecostudio.vmoptions",
        DriverData: "C:\\Windows\\System32\\Drivers\\DriverData",
        EDITOR: "C:\\WINDOWS\\notepad.exe",
        EFC_7812: "1",
        GATEWAY_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\gateway.vmoptions",
        GIT_ASKPASS: "d:\\tool\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass.sh",
        GOLAND_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\goland.vmoptions",
        GOPATH: "D:\\tool\\go\\lib;D:\\workspace\\lab\\go",
        GOROOT: "D:\\tool\\go",
        GRADLE_HOME: "D:\\tool\\gradle-6.4.1-bin",
        GRADLE_USER_HOME: "D:\\tool\\gradle-6.4.1-bin",
        HADOOP_HOME: "D:\\tool\\bigdata\\hadoop-3.3.0",
        HIVE_HOME: "D:\\tool\\bigdata\\apache-hive-3.1.3-bin",
        HOME: "C:\\Users\\Administrator",
        HOMEDRIVE: "C:",
        HOMEPATH: "\\Users\\Administrator",
        IDEA_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\idea.vmoptions",
        INIT_CWD: "D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend",
        JAVA_HOME: "D:\\tool\\Java\\jdk1.8.0_131",
        JETBRAINSCLIENT_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\jetbrainsclient.vmoptions",
        JETBRAINS_CLIENT_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\jetbrains_client.vmoptions",
        LANG: "en_US.UTF-8",
        LOCALAPPDATA: "C:\\Users\\Administrator\\AppData\\Local",
        LOGONSERVER: "\\\\HUAWEIP40",
        M2_HOME: "D:\\tool\\apache-maven-3.6.3-bin",
        NODE: "D:\\tool\\nvm\\nodejs\\node.exe",
        NODE_EXE: "D:\\tool\\nvm\\nodejs\\\\node.exe",
        NODE_OPTIONS: " --require \"d:/tool/Microsoft VS Code/resources/app/extensions/ms-vscode.js-debug/src/bootloader.js\"  --inspect-publish-uid=http",
        NPM_CLI_JS: "D:\\tool\\nvm\\nodejs\\\\node_modules\\npm\\bin\\npm-cli.js",
        npm_command: "install",
        npm_config_audit: "",
        npm_config_cache: "D:\\dev\\node\\node_cache",
        npm_config_globalconfig: "D:\\dev\\node\\node_global\\etc\\npmrc",
        npm_config_global_prefix: "D:\\dev\\node\\node_global",
        npm_config_home: "https://npmmirror.com",
        npm_config_init_module: "C:\\Users\\Administrator\\.npm-init.js",
        npm_config_local_prefix: "D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend",
        npm_config_loglevel: "verbose",
        npm_config_node_gyp: "D:\\tool\\nvm\\v20.11.1\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js",
        npm_config_noproxy: "",
        npm_config_npm_version: "10.2.4",
        npm_config_prefix: "D:\\dev\\node\\node_global",
        npm_config_registry: "https://registry.npmmirror.com",
        npm_config_strict_ssl: "",
        npm_config_userconfig: "C:\\Users\\Administrator\\.npmrc",
        npm_config_user_agent: "npm/10.2.4 node/v20.11.1 win32 x64 workspaces/false",
        npm_execpath: "D:\\tool\\nvm\\v20.11.1\\node_modules\\npm\\bin\\npm-cli.js",
        npm_lifecycle_event: "install",
        npm_lifecycle_script: "npm install --verbose",
        npm_node_execpath: "D:\\tool\\nvm\\nodejs\\node.exe",
        npm_package_dev: "",
        npm_package_dev_optional: "",
        npm_package_integrity: null,
        npm_package_json: "D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend\\package.json",
        npm_package_name: "voting-system-backend",
        npm_package_optional: "",
        npm_package_peer: "",
        npm_package_resolved: null,
        npm_package_version: "1.0.0",
        NPM_PREFIX_NPM_CLI_JS: "D:\\dev\\node\\node_global\\node_modules\\npm\\bin\\npm-cli.js",
        NUMBER_OF_PROCESSORS: "8",
        NVM_HOME: "D:\\tool\\nvm",
        NVM_SYMLINK: "D:\\tool\\nvm\\nodejs",
        OneDrive: "C:\\Users\\Administrator\\OneDrive",
        OPENSSL_CONF: "D:\\tool\\OpenSSL-Win64\\bin\\openssl.cfg",
        ORIGINAL_XDG_CURRENT_DESKTOP: "undefined",
        OS: "Windows_NT",
        Path: "D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\node_modules\\.bin;D:\\workspace\\RuoYi\\node_modules\\.bin;D:\\workspace\\node_modules\\.bin;D:\\node_modules\\.bin;D:\\tool\\nvm\\v20.11.1\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\node_modules\\.bin;D:\\workspace\\RuoYi\\node_modules\\.bin;D:\\workspace\\node_modules\\.bin;D:\\node_modules\\.bin;D:\\tool\\nvm\\v20.11.1\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\node_modules\\.bin;D:\\workspace\\RuoYi\\node_modules\\.bin;D:\\workspace\\node_modules\\.bin;D:\\node_modules\\.bin;D:\\tool\\nvm\\v20.11.1\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\node_modules\\.bin;D:\\workspace\\RuoYi\\es-tutotial\\node_modules\\.bin;D:\\workspace\\RuoYi\\node_modules\\.bin;D:\\workspace\\node_modules\\.bin;D:\\node_modules\\.bin;D:\\tool\\nvm\\v20.11.1\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;D:\\tool\\go\\bin;D:\\dev\\node\\node_global\\node_modules\\yarn\\bin;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\WINDOWS\\System32\\OpenSSH\\;D:\\tool\\Git\\bin;D:\\tool\\gradle\\gradle-7.1\\bin;D:\\tool\\apache-maven-3.6.3-bin\\bin;D:\\tool\\go\\bin;D:\\tool\\cygwin64\\bin;D:\\tool\\cmake\\bin;D:\\tool\\MingGW\\bin;D:\\tool\\make-3.81-bin\\bin;D:\\tool\\GnuWin32\\bin;D:\\tool\\bigdata\\hadoop-3.3.0\\bin;D:\\tool\\sqlite;D:\\tool\\Git\\cmd;D:\\tool\\scala3-3.2.2\\bin;D:\\tool\\cygwin64\\netcat-win32-1.11;D:\\tool\\bigdata\\hadoop-3.3.0\\sbin;D:\\tool\\bigdata\\apache-hive-3.1.3-bin\\bin;%SPARK_HOME%\\bin;D:\\tool\\Python\\Python312\\;D:\\tool\\Python\\Python312\\Scripts;D:\\tool\\OpenSSL-Win64\\bin;D:\\tool\\Java\\jdk1.8.0_131\\bin;D:\\tool\\nvm;D:\\tool\\nvm;D:\\tool\\nvm\\nodejs;D:\\dev\\node\\node_global;D:\\tool\\Python\\Python312\\Scripts\\;D:\\tool\\Python\\Python312\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\WINDOWS\\System32\\OpenSSH\\;D:\\tool\\Java\\jdk1.8.0_131\\bin;D:\\tool\\Git\\bin;D:\\tool\\gradle\\gradle-7.1\\bin;D:\\tool\\apache-maven-3.6.3-bin\\bin;D:\\tool\\go\\bin;D:\\tool\\cygwin64\\bin;D:\\tool\\cmake\\bin;D:\\tool\\MingGW\\bin;D:\\tool\\make-3.81-bin\\bin;D:\\tool\\GnuWin32\\bin;D:\\tool\\sqlite;D:\\tool\\sqlite\\bin;D:\\tool\\scala3-3.2.2\\bin;D:\\tool\\cygwin64\\netcat-win32-1.11;D:\\tool\\Microsoft VS Code\\bin;C:\\Users\\Administrator\\AppData\\Local\\Microsoft\\WindowsApps;D:\\tool\\Nmap;D:\\tool\\nvm;D:\\tool\\nvm\\nodejs;",
        PATHEXT: ".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC",
        PHPSTORM_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\phpstorm.vmoptions",
        PROCESSOR_ARCHITECTURE: "AMD64",
        PROCESSOR_IDENTIFIER: "Intel64 Family 6 Model 158 Stepping 13, GenuineIntel",
        PROCESSOR_LEVEL: "6",
        PROCESSOR_REVISION: "9e0d",
        ProgramData: "C:\\ProgramData",
        ProgramFiles: "C:\\Program Files",
        "ProgramFiles(x86)": "C:\\Program Files (x86)",
        ProgramW6432: "C:\\Program Files",
        PROMPT: "$P$G",
        PSModulePath: "C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules",
        PUBLIC: "C:\\Users\\Public",
        PYCHARM_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\pycharm.vmoptions",
        PYTHONPATH: "D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend/PyWxDump;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend/PyWxDump/pywxdump;D:\\workspace\\RuoYi\\es-tutotial\\typescript\\project\\ts-vote-app\\voting-system-backend/PyWxDump/pywxdump/pyqt",
        RIDER_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\rider.vmoptions",
        RUBYMINE_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\rubymine.vmoptions",
        SESSIONNAME: "Console",
        SPARK_HOME: "D:\\tool\\bigdata\\spark-3.4.3-bin-hadoop3",
        STUDIO_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\studio.vmoptions",
        SystemDrive: "C:",
        SystemRoot: "C:\\WINDOWS",
        TEMP: "C:\\Users\\ADMINI~1\\AppData\\Local\\Temp",
        TERM_PROGRAM: "vscode",
        TERM_PROGRAM_VERSION: "1.96.2",
        TMP: "C:\\Users\\ADMINI~1\\AppData\\Local\\Temp",
        USERDOMAIN: "HUAWEIP40",
        USERDOMAIN_ROAMINGPROFILE: "HUAWEIP40",
        USERNAME: "Administrator",
        USERPROFILE: "C:\\Users\\Administrator",
        VBOX_MSI_INSTALL_PATH: "G:\\tool\\vm\\",
        VSCODE_GIT_ASKPASS_EXTRA_ARGS: "",
        VSCODE_GIT_ASKPASS_MAIN: "d:\\tool\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass-main.js",
        VSCODE_GIT_ASKPASS_NODE: "D:\\tool\\Microsoft VS Code\\Code.exe",
        VSCODE_GIT_IPC_HANDLE: "\\\\.\\pipe\\vscode-git-c825073de5-sock",
        VSCODE_INSPECTOR_OPTIONS: "{\"inspectorIpc\":\"\\\\\\\\.\\\\pipe\\\\node-cdp.11924-c0b4b467-0.sock\",\"deferredMode\":false,\"waitForDebugger\":\"\",\"execPath\":\"D:\\\\tool\\\\nvm\\\\nodejs\\\\node.exe\",\"onlyEntrypoint\":false,\"autoAttachMode\":\"always\",\"openerId\":\"2c29d8af9d142a6f67823f20\"}",
        WEBIDE_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\webide.vmoptions",
        WEBSTORM_VM_OPTIONS: "D:\\tool\\JetBrains\\ideapojie\\jetbra\\vmoptions\\webstorm.vmoptions",
        windir: "C:\\WINDOWS",
    },
    "shell": true,
    "stdio": 'pipe',
    "stdioString": undefined,
    windowsVerbatimArguments: true
};
const options = {}
const child = spawn(cmd, args, options); // 这里可以替换成你要执行的命令和参数

// 监听子进程的标准输出
child.stdout.on('data', (data) => {
    console.log(`输出：${data}`);
});

// 监听子进程的错误输出
child.stderr.on('data', (data) => {
    console.error(`错误：${data}`);
});

// 监听子进程的关闭事件
child.on('close', (code) => {
    console.log(`子进程退出，退出码：${code}`);
});
