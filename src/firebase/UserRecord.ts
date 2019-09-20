interface DeviceInfo {
    apiLevel?: number;
    deviceId?: string;
    deviceLocale?: string;
    deviceName?: string;
    manufacturer?: string;
    systemName?: string | number;
    systemVersion?: string | number;
    timezone?: string;
}

interface Platform {
    OS: string;
    Version: number | string;
}

interface MOLApp {
    appVersion: string | number;
    bundleId: string;
}

interface currentPage {
    pagePath: string;
}

enum Envs {
    QA = "sg-gov-tech-mol-qa",
    DEEV = "sg-gov-tech-mol-dev",
    DBG = "sg-gov-tech-mol-dbg"
}

export const firebaseEnvs: string[] = Object.values(Envs);
type FirebaseEnv = typeof firebaseEnvs[number];

export interface UserRecord {
    Platform?: Platform;
    DeviceInfo?: DeviceInfo;
    MOLApp?: MOLApp;
    currentPage?: currentPage;
    isConnected?: boolean;
    lastUpdated?: number | string;
    pushToken?: string;
    authLevel?: string;
    appState?: string;
    appVersion?: string | number;
}

export type MOLEnvObj = {
    [env: string]: UserRecord;
};

export interface MOLEnvs {
    [env: string]: MOLEnvObj;
}

export type FirebaseEntry = UserRecord | MOLEnvs;
