
import { Language } from './types';

export const TRANSLATIONS = {
  [Language.CN]: {
    title: "小菜的学习笔记",
    subtitle: "UNITY 技术 / 图形学 / 思考",
    shaderWorks: "着色器实验",
    unityWorks: "Unity 工程",
    techInsights: "技术情报",
    readMore: "阅读更多",
    backHome: "返回指令中心",
    placeholder: "施工区域...",
    themeLight: "日间模式",
    themeDark: "夜视模式",
    bgmOn: "音频通讯开启",
    bgmOff: "音频通讯关闭",
    langSwitch: "Switch to English",
    donate: "军费赞助",
    nav: {
      home: "指令中心", // COMMAND
      notes: "档案库",   // ARCHIVES
      portfolio: "军械库", // MUNITIONS
      guestbook: "信号站"  // SIGNAL
    },
    navDesc: {
      home: "主页",
      notes: "学习笔记",
      portfolio: "作品集",
      guestbook: "留言板"
    },
    notes: {
      title: "作战日志",
      subtitle: "绝密档案 // 仅供内部参考",
      author: "操作员: 小菜",
      lastUpdate: "最后同步",
      back: "撤回 (返回)",
      reading: "正在解析数据...",
      category: "分类"
    },
    guestbook: {
      transmit: "发射信号",
      inputPlaceholder: "输入加密频段...",
      config: "系统配置",
      write: "录入",
      delete: "抹除",
      empty: "无信号...",
      systemReady: "系统就绪 // 等待指令",
      transmissionComplete: "信号传输完毕",
      sending: "正在发射...",
      security: {
        scanning: "安全协议扫描...",
        threat: "警告：入侵检测",
        cooldown: "武器冷却中...",
        safe: "安全检查通过",
        lockdown: "拒绝访问 // 锁定"
      }
    }
  },
  [Language.EN]: {
    title: "XIAO CAI'S NOTES",
    subtitle: "UNITY TECH / GRAPHICS / THOUGHTS",
    shaderWorks: "Shader Experiments",
    unityWorks: "Unity Projects",
    techInsights: "Tech Intel",
    readMore: "ACCESS",
    backHome: "Return Command",
    placeholder: "Restricted Area...",
    themeLight: "Light Mode",
    themeDark: "Night Vision",
    bgmOn: "Comms On",
    bgmOff: "Comms Off",
    langSwitch: "切换到中文",
    donate: "Support",
    nav: {
      home: "COMMAND",
      notes: "ARCHIVES",
      portfolio: "MUNITIONS",
      guestbook: "SIGNAL"
    },
    navDesc: {
      home: "Home",
      notes: "Study Notes",
      portfolio: "Portfolio",
      guestbook: "Guestbook"
    },
    notes: {
      title: "FIELD LOGS",
      subtitle: "TOP SECRET // EYES ONLY",
      author: "OPERATOR: XIAO CAI",
      lastUpdate: "LAST SYNC",
      back: "RETREAT (BACK)",
      reading: "DECRYPTING DATA...",
      category: "CLASS"
    },
    guestbook: {
      transmit: "BROADCAST",
      inputPlaceholder: "ENTER ENCRYPTED MSG...",
      config: "SYS.CONFIG",
      write: "INPUT",
      delete: "PURGE",
      empty: "NO SIGNAL...",
      systemReady: "SYSTEM READY // AWAITING",
      transmissionComplete: "BROADCAST SENT",
      sending: "SENDING...",
      security: {
        scanning: "SCANNING PROTOCOL...",
        threat: "WARNING: INTRUSION DETECTED",
        cooldown: "SYSTEM COOLDOWN...",
        safe: "SECURITY CHECK PASSED",
        lockdown: "ACCESS DENIED // LOCKDOWN"
      }
    }
  }
};

// Placeholder for Vaporwave music
export const BGM_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-chill-111456.mp3";