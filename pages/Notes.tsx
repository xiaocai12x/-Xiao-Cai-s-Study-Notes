
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, SoundType } from '../types';
import { TRANSLATIONS } from '../constants';
import { ArrowLeft, Stamp, AlertTriangle, Zap, Search, List, ChevronRight, Hash, ChevronLeft, Terminal } from 'lucide-react';
import { useAudioSystem } from '../hooks/useAudioSystem';

interface NotesProps {
  language: Language;
}

// Mock Data with Markdown formatting (Expanded)
const NOTES_DATA = [
  {
    id: 6,
    title: "SC-101: C# & Unity Basics",
    titleCN: "SC课程学习笔记：C#与Unity基础",
    date: "2025.02.25",
    category: "CS-101",
    desc: "Comprehensive guide to C# syntax, Unity Lifecycle, and Physics system.",
    content: `## C# 编程基础

### 变量与类型

#### 变量

程序中最基本的数据单元。
一个变量是有一定大小的 container，其中可以存放各种类型的数据（整数，小数，文本，etc.）

流程：定义变量 → 使用变量
定义变量的语法：\`<类型> <名称> = <初始值>;\`

> int myNumber = 5;

这代表定义了一个整数（integer）类型的变量，叫 myNumber，并且其初始值为 5。
名称是自己取的，类型是要遵循编程语言的。
初始值是可选的！可以不对一个变量赋初始值。

> int b;

#### 变量类型

所有的变量都有一个类型。
基本的变量类型（一部分）：

- \`int\` （整数 2, 45, -99, -1459289, ...）
- \`float\` （小数 3.1, 9.002, -3.14, 0.0, ...）
- \`string\` （字符串 abc, unity, 2023newyear, Silverjay!!!, @^$%&#@, ...）
- \`bool\` （布尔值，真或假 true, false）

#### 类型转换

可以将一个变量从A类型转换成B类型并把它的值给另一个变量。
语法: \`(新类型)变量名\`

> int a = 5;
> float b = (float)a;

不可以通过类型转换改变一个变量原本的类型！

</> 用类型转换实现两个整数变量的小数除法吧！

\`\`\`csharp
int num1 = 7;
int num2 = 3;
float result = (float)num1 / (float)num2;
// result 将会是 2.333... 而不是整数除法得到的 2
\`\`\`

#### 运算符（值）

和数学中的一样，有加法（+），减法（-），乘法（*），除法（/）等等的运算符。
"=" 是一个特殊的运算符，它是"赋值"，而非"等于"。
语法：左边=右边，左边是一个变量，右边是一个值。
比如：\`abc = 5142\` 的作用是把右边的值（5142）装进左边的变量（abc）里。

</> 使用这些运算符！
</> 变量类型与运算符；整数与小数除法

\`\`\`csharp
// 基本运算符使用
int a = 10;
int b = 3;
int sum = a + b;        // 加法：13
int difference = a - b; // 减法：7
int product = a * b;    // 乘法：30
int quotient = a / b;   // 整数除法：3

// 整数与小数除法对比
float decimalResult = (float)a / b; // 小数除法：3.333...
\`\`\`

#### 运算符（比较）

C#中也有用来比较两个变量大小的运算符：
- 大于（>），大于等于（>=）
- 小于（<），小于等于（<=）
- 等于（==）
- 不等于（!=）
- 并且（&&）
- 或者（||）

它们得出的是一个 bool 值（要么是要么不是）！

</> 使用 if else 判断成绩是否及格！

### 条件和循环

#### 条件语句

大名鼎鼎的 if else。
语法：

\`\`\`csharp
if(A)
{ 
    B 
}
else
{ 
    C 
}
\`\`\`

其中 else 可替换成 else if。
A: 一个 bool 值或表达式
B, C: 代码片段

#### 循环语句（while）

将重复性的工作简写。
while 循环的意义：当一个条件成立时，一直一遍遍地执行其中的代码。

语法：

\`\`\`csharp
while (A)
{
    B
}
\`\`\`

A 是循环持续的条件（一个 bool 值或表达式）
B 是一段代码

</> 使用 while 循环打印 10 遍信息！

#### 循环语句（for）

for 循环的意义：也是当一个条件成立时，一直一遍遍地执行其中的代码。

语法：

\`\`\`csharp
for (A; B; C)
{
    D
}
\`\`\`

A 是循环变量的初始值
B 是循环持续的条件（bool 值）
C 是每次循环结束后执行的代码
D 是一段代码

</> 使用 for 循环打印 10 遍信息！

### 函数

#### 函数 function

可以想成一个包含了一些代码的变量。
每一个函数也可以认为是一个变量类型。

函数定义的语法：返回类型 名称(参数) {函数内容}

\`\`\`csharp
int add(int a, float b)
{
    return a + b;
}
\`\`\`

流程：定义函数 -> 调用函数

</> 了解参数与返回，并尝试使用函数！

#### 使用函数

使用函数的语法：\`函数名(参数);\`

比如 \`add(3, 5);\`
可以将函数的返回值赋给另一个变量。

> int sum = add(3, 5);

### 类

#### 类 class

一个类是包含了一系列变量（或称为字段）和函数（或称为方法）的数据类型。
类是*数据类型*！
可以把类想象成工具，类的函数想象成这个工具的功能。

定义类的语法：

\`\`\`csharp
class 类名
{
    // 变量与函数
}
\`\`\`

类其实是 C# 中最基本的构成元素。所有东西都是在一个特定的类中的！

</> 分析 Unity Script 中类的存在

#### 类与实例 instance

因为类是数据类型，所以也可以像一般的变量一样使用！
比如有一个类叫 MyClass，则可以定义一个变量：

> MyClass a;

同样是 \`<变量类型> <变量名>;\` 的语法，和 \`int a;\` 一样。
通过这种方法定义的变量成为该类的实例。
为什么要这么复杂？因为想要一个变量里装很多很多的东西！不然可能会更麻烦。

#### 结构体 struct

大体上和类一模一样，也是一个复合的数据类型。
语法也一样，使用起来也一样。

**结构体与类的具体差异**

1. **类型分类**
   - 类（class）是引用类型
   - 结构体（struct）是值类型

2. **内存分配**
   - 类：实例分配在堆（heap）上
   - 结构体：实例分配在栈（stack）上

3. **赋值行为**
   - 类：引用拷贝（b和a引用同一个对象）
   - 结构体：值拷贝（y是x的副本）

4. **继承**
   - 类：支持继承
   - 结构体：不支持继承

**示例代码：**

\`\`\`csharp
struct Point {
    public int X;
    public int Y;
}
Point p1 = new Point(10, 20);
Point p2 = p1;  // 创建副本
p2.X = 30;      // 不影响p1
\`\`\`

**使用场景建议：**
- 使用结构体：坐标、颜色、小数等简单值类型
- 使用类：玩家、敌人、物品等复杂对象

#### 命名空间 namespace

命名空间是装了一大堆类的集合。
是"最大"的概念。

#### 访问权限

加在一个变量或函数上，决定了有哪些类能"看到"这个变量或函数。
常见的访问权限（一部分）：

- \`private\` (只有自己这个类能访问)
- \`public\` (所有人都能访问)

如果不写明访问权限，则默认是 private！

> private float time = 5.91f;
> public void DoNothing(){}

</> 在 Unity 中看见你定义的变量！

### 数组与继承

#### 数组

在一个变量中存放一系列相同类型的变量。
语法：\`类型[] 变量名;\`

> int[] arr;

初始化数组：数组要初始化之后才能使用！
语法：\`数组名 = new 类型[长度];\`

> arr = new int[10];

</> 新建一些数组吧！

#### 使用数组

使用 \`[序号]\` 来访问数组中的元素。
序号是一个 int，从 0 开始数起！！！！

> int[] arr = new int[10];
> arr[0] = 1; // 将数组的第一个元素设为 1
> arr[9] = 8; // 将数组的最后一个元素设为 8

</> 使用循环访问数组！

#### 继承

一个类可以成为另一个类的孩子。
孩子类会自动获得家长类的内容。

## Unity 程序核心概念

### 01. 事件驱动生命周期
Unity 脚本并非像传统程序那样从 main() 开始顺序执行，而是基于**事件 (Events)** 的生命周期。

**关键生命周期函数：**
- \`Awake()\`：**初始化阶段**。脚本实例被加载时调用，早于 Start。通常用于初始化变量或自身引用。即使脚本被禁用也会执行。
- \`Start()\`：**准备阶段**。在第一次 Update 之前调用。通常用于获取其他对象的引用。
- \`Update()\`：**逻辑帧**。每一帧调用一次。处理用户输入、游戏逻辑的核心位置。
- \`FixedUpdate()\`：**物理帧**。固定时间间隔调用 (0.02s)。所有物理计算（刚体受力）必须在此处理。

### 02. 游戏对象与组件
**GameObject** 是容器，**Component** 是功能。

- \`Transform\`：每个对象都有，控制位置、旋转、缩放。
- \`GetComponent<T>()\`：获取物体上的特定组件。
- \`SetActive(bool)\`：控制物体的显示/隐藏。

## 物理系统

### 01. 刚体 (Rigidbody)
赋予物体物理属性（质量、重力、阻力）。
- **Use Gravity**：是否受重力影响。
- **Is Kinematic**：运动学模式。开启后不受物理引擎力场影响（如重力、碰撞推力），完全由代码控制移动，但仍能撞击其他动态物体。

### 02. 碰撞体 (Collider)
定义物体的物理形状边界。
- **物理碰撞**：双方都有 Collider，至少一方有 Rigidbody (非 Kinematic)。产生物理反弹。
- **触发器 (Trigger)**：勾选 \`Is Trigger\`。物体会穿过它，不会反弹，但会触发 \`OnTriggerEnter\` 事件。常用于检测到达区域、拾取道具。

### 03. 射线检测 (Raycast)
从一点向一个方向发射隐形激光，检测碰到了什么。是射击游戏、视线检测的核心。

语法：
\`Physics.Raycast(起点, 方向, out HitInfo, 距离, 层级)\`

> if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit, 100f))
> {
>     Debug.Log("Hit target: " + hit.collider.name);
> }`
  },
  {
    id: 1,
    title: "URP Render Pass Injection",
    titleCN: "URP渲染通道注入战术",
    date: "2023.10.24",
    category: "GRAPHICS",
    desc: "Intercepting SRP for custom effects.",
    content: `## 01. TACTICAL ANALYSIS
Implementation required bypassing standard safety protocols. **Direct memory access** was authorized by Command.

- Intercepted the **ScriptableRenderContext**
- Injected custom command buffers before opaque pass
- Optimized for mobile GPU architecture

## 02. EXECUTION LOG
The geometry shader pipeline was reconfigured to handle the load. 

> WARNING: Latency detected in the depth pre-pass. Ensure the stencil buffer is cleared before the *volumetric* injection.

We observed a **significant drop** in draw calls after batching the instanced meshes. The visual output now matches the target reference from the 1980s archive.`
  },
  {
    id: 2,
    title: "Stylized Water Simulation",
    titleCN: "风格化水体模拟算法",
    date: "2023.11.05",
    category: "SHADER",
    desc: "Gerstner Waves equations.",
    content: `## THEORY
Implementing **Gerstner Waves** for physical displacement.
The goal is not realism, but a *constructivist interpretation* of fluid dynamics.

- Calculated normal vectors in vertex function
- Applied **fresnel effect** based on view angle
- Foam generated via depth-based color intersection

> NOTE: Performance cost is high on mobile devices. Optimization required.`
  },
  {
    id: 3,
    title: "ECS Performance Tuning",
    titleCN: "ECS架构性能调优",
    date: "2023.12.12",
    category: "ARCHITECTURE",
    desc: "Data-oriented design patterns.",
    content: `## ARCHITECTURE UPDATE
Shifted from Object-Oriented to **Data-Oriented** design.
Memory layout is now contiguous, reducing cache misses by **40%**.

- ComponentData arrays aligned
- SystemStateComponents used for lifecycle management
- **BurstCompiler** enabled for heavy calculation jobs`
  },
  {
    id: 4,
    title: "Inverse Kinematics Mech",
    titleCN: "反向动力学机甲控制",
    date: "2024.01.15",
    category: "ANIMATION",
    desc: "Procedural movement logic.",
    content: `## MOTION LOGIC
Procedural animation allows the heavy machinery to adapt to uneven terrain without pre-baked assets.

- Raycast ground detection
- **FABRIK** algorithm for leg placement
- Center of mass interpolation

The mech now feels "heavy" and "grounded" as per the visual directive.`
  },
  {
    id: 5,
    title: "Volumetric Cloud Rendering",
    titleCN: "体积云渲染技术",
    date: "2024.02.20",
    category: "VFX",
    desc: "Raymarching techniques.",
    content: `## ATMOSPHERIC DENSITY
Implemented **Raymarching** within a compute shader to render volumetric data.

- Noise texture generation (Perlin + Worley)
- Light absorption calculated via Beer's Law
- **Temporal Reprojection** used to reduce noise

> ALERT: GPU temperature increase detected during high-res rendering.`
  }
];

// === CUSTOM MARKDOWN RENDERER ===
interface MarkdownProps {
  content: string;
  searchQuery: string;
}

const MarkdownRenderer: React.FC<MarkdownProps> = ({ content, searchQuery }) => {
  const lines = content.split('\n');
  let inCodeBlock = false;

  // Helper to highlight text
  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<mark class="bg-soviet-yellow text-soviet-black px-1 mx-0.5 font-bold rounded-sm">$1</mark>');
  };

  const processInline = (text: string) => {
    let processed = highlightText(text);
    // Bold: **text**
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-soviet-red">$1</strong>');
    // Italic: *text*
    processed = processed.replace(/\*(.*?)\*/g, '<em class="font-serif italic opacity-80">$1</em>');
    // Code inline: `text`
    processed = processed.replace(/`(.*?)`/g, '<code class="font-mono bg-soviet-black/10 dark:bg-soviet-paper/10 px-1 text-sm rounded-sm text-soviet-darkRed dark:text-soviet-cyan">$1</code>');
    return processed;
  };

  return (
    <div className="space-y-4">
      {lines.map((line, index) => {
        // Toggle Code Block
        if (line.startsWith('```')) {
          inCodeBlock = !inCodeBlock;
          return null; // Don't render the fence line itself
        }

        if (inCodeBlock) {
           return (
             <div key={index} className="font-mono text-sm bg-soviet-black/90 text-soviet-paper px-4 py-0.5 first-of-type:rounded-t last-of-type:rounded-b border-l-4 border-soviet-cyan">
               {line}
             </div>
           )
        }

        // Main Headers (## )
        if (line.startsWith('## ')) {
          const headerText = line.slice(3).trim();
          const headerId = `header-${index}`;
          return (
            <div key={index} className="relative group">
               {/* Constructivist decoration line */}
               <div className="absolute -left-6 top-1/2 w-4 h-[2px] bg-soviet-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 id={headerId} className="scroll-mt-24 text-2xl md:text-3xl font-black uppercase tracking-wider mt-12 mb-6 border-l-[6px] border-soviet-red pl-4 text-soviet-black dark:text-soviet-paper bg-gradient-to-r from-soviet-black/5 to-transparent dark:from-soviet-paper/5 py-2">
                 <span dangerouslySetInnerHTML={{ __html: processInline(headerText) }} />
               </h3>
            </div>
          );
        }
        // Sub Headers (### )
        if (line.startsWith('### ')) {
          const headerText = line.slice(4).trim();
          return (
            <h4 key={index} className="text-lg md:text-xl font-bold mt-8 mb-4 text-soviet-black dark:text-soviet-paper flex items-center gap-3">
              <div className="w-2 h-2 bg-soviet-red rotate-45 transform group-hover:rotate-90 transition-transform"></div>
              <span dangerouslySetInnerHTML={{ __html: processInline(headerText) }} />
            </h4>
          );
        }
        // Sub-Sub Headers (#### ) - New support
        if (line.startsWith('#### ')) {
          const headerText = line.slice(5).trim();
          return (
            <h5 key={index} className="text-base font-black mt-6 mb-2 text-soviet-red dark:text-soviet-cyan uppercase tracking-wide border-b border-soviet-black/10 dark:border-soviet-paper/10 pb-1 inline-block">
              <span dangerouslySetInnerHTML={{ __html: processInline(headerText) }} />
            </h5>
          );
        }
        // Lists (- )
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="list-none ml-4 flex items-start gap-3 mb-3">
              <span className="text-soviet-red font-black mt-1.5 text-xs">■</span>
              <span className="text-soviet-black/80 dark:text-soviet-paper/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: processInline(line.slice(2)) }} />
            </li>
          );
        }
        // Action/Task Items (</> ) - New support
        if (line.startsWith('</> ') || line.startsWith('*</>* ')) {
           const content = line.replace(/^(\*?<\/>\*?)\s/, '');
           return (
             <div key={index} className="my-4 p-3 bg-soviet-yellow/10 border border-soviet-yellow/50 text-soviet-black dark:text-soviet-paper text-sm font-bold flex items-center gap-2 rounded-sm">
                <Terminal size={14} className="text-soviet-darkRed min-w-[14px]" />
                <span dangerouslySetInnerHTML={{ __html: processInline(content) }} />
             </div>
           );
        }
        // Blockquotes (> )
        if (line.startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-soviet-black dark:border-soviet-paper bg-soviet-black/5 dark:bg-soviet-paper/5 p-4 my-6 font-mono text-xs md:text-sm italic whitespace-pre-wrap text-soviet-black dark:text-soviet-paper relative overflow-hidden">
               <div className="absolute top-0 right-0 p-1 opacity-10">
                  <AlertTriangle size={24} />
               </div>
              <span dangerouslySetInnerHTML={{ __html: processInline(line.slice(2)) }} />
            </blockquote>
          );
        }
        // Empty lines
        if (line.trim() === '') return <div key={index} className="h-2" />;
        
        // Regular paragraphs
        return (
          <p key={index} className="leading-relaxed text-soviet-black/90 dark:text-soviet-paper/90 mb-4" dangerouslySetInnerHTML={{ __html: processInline(line) }} />
        );
      })}
    </div>
  );
};

const Notes: React.FC<NotesProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { playSound } = useAudioSystem();

  const selectedNote = useMemo(() => NOTES_DATA.find(n => n.id === selectedNoteId), [selectedNoteId]);

  // Generate Table of Contents from content headers
  const tableOfContents = useMemo(() => {
    if (!selectedNote) return [];
    const lines = selectedNote.content.split('\n');
    return lines
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return { id: `header-${index}`, text: line.slice(3).trim() };
        }
        return null;
      })
      .filter((item): item is { id: string; text: string } => item !== null);
  }, [selectedNote]);

  const handleNoteSelect = (id: number) => {
    playSound(SoundType.OPEN);
    setSelectedNoteId(id);
    setSearchQuery('');
  };

  const handleBack = () => {
    playSound(SoundType.CLICK);
    setSelectedNoteId(null);
    setIsSidebarCollapsed(false); // Reset sidebar on exit
  };

  const scrollToSection = (id: string) => {
    playSound(SoundType.CLICK);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pl-0 md:pl-64 bg-soviet-paper dark:bg-[#0f0f0f] relative overflow-hidden flex flex-col pt-16 md:pt-0 transition-colors duration-300">
      
      {/* ================= ATMOSPHERE: SCAN LINE ================= */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5">
         <div className="w-full h-[2px] bg-soviet-cyan animate-scan absolute top-0 shadow-[0_0_20px_#7A8F95]"></div>
      </div>

      {/* ================= BACKGROUND CHAOS ================= */}
      <div className="fixed top-0 left-0 md:left-64 right-0 bottom-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] right-[-10%] text-[25vw] font-black text-soviet-black opacity-[0.03] dark:opacity-[0.05] leading-none tracking-tighter mix-blend-multiply">
            DATA<br />ARCH
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[800px] bg-stripes opacity-5 transform rotate-12 origin-top-right grayscale"></div>
        <div className="absolute bottom-[10%] left-[10%] w-64 h-64 bg-soviet-black dark:bg-soviet-paper opacity-5 rotate-45"></div>
      </div>

      {/* ================= HEADER (LIST VIEW ONLY) ================= */}
      <AnimatePresence>
        {!selectedNote && (
          <motion.header 
            exit={{ opacity: 0, y: -50 }}
            className="relative z-10 pt-8 md:pt-16 pb-4 md:pb-8 px-4 md:px-12 flex flex-col items-start gap-4"
          >
            <div className="absolute top-0 left-0 w-full h-8 bg-soviet-black text-soviet-paper flex items-center overflow-hidden border-b border-soviet-red/50">
               <div className="animate-marquee whitespace-nowrap font-mono text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase flex items-center">
                  <AlertTriangle size={10} className="mx-4 text-soviet-red" /> ARCHIVE ACCESS GRANTED // 档案库访问权限已确认 <AlertTriangle size={10} className="mx-4 text-soviet-red" /> MONITORING
               </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-6 relative mt-4 md:mt-0">
               <div className="relative">
                  <h1 className="text-6xl md:text-9xl font-black text-soviet-black dark:text-soviet-paper uppercase leading-[0.8] tracking-tighter relative z-10">
                    {language === Language.CN ? "档案" : "FIELD"}
                    <br />
                    <span className="text-soviet-black/40 dark:text-soviet-paper/40 pl-8 md:pl-12">{language === Language.CN ? "记录" : "LOGS"}</span>
                  </h1>
               </div>
               <div className="hidden md:flex flex-col justify-between h-32 border-l-4 border-soviet-black/20 dark:border-soviet-paper/20 pl-4 py-1">
                  <span className="font-mono text-xs font-bold text-soviet-black dark:text-soviet-paper uppercase tracking-widest opacity-60">
                     /// CLASSIFIED
                  </span>
                  <div className="text-right">
                      <div className="text-2xl font-black text-soviet-black dark:text-soviet-paper">SEC-04</div>
                      <div className="text-xs font-serif italic opacity-60 text-soviet-black dark:text-soviet-paper">Status: Active</div>
                  </div>
               </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-grow relative z-10 px-0 md:px-0 pb-0 overflow-hidden h-full">
        <AnimatePresence mode="wait">
          {!selectedNote ? (
            /* ================= LIST VIEW ================= */
            <motion.div 
              key="list"
              className="flex flex-col gap-4 md:gap-6 max-w-6xl mx-auto mt-4 md:mt-8 px-4 md:px-12 overflow-y-auto pb-20 h-full custom-scrollbar"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              {NOTES_DATA.map((note) => (
                <motion.div
                  key={note.id}
                  variants={{ hidden: { x: -50, opacity: 0 }, show: { x: 0, opacity: 1 } }}
                  onClick={() => handleNoteSelect(note.id)}
                  onMouseEnter={() => playSound(SoundType.HOVER)}
                  className="group relative w-full cursor-pointer md:cursor-none perspective-1000"
                  data-hoverable="true"
                >
                  <div className="
                    relative bg-white dark:bg-[#1a1a1a] 
                    border-l-[8px] md:border-l-[12px] border-l-soviet-black dark:border-l-soviet-paper border-y border-r border-soviet-black/20 dark:border-soviet-paper/30
                    p-4 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6
                    transition-all duration-200 ease-out
                    group-hover:bg-soviet-black group-hover:border-soviet-cyan group-hover:border-l-soviet-cyan
                    md:group-hover:translate-x-4 md:group-hover:-translate-y-2
                    group-hover:shadow-[5px_5px_0px_#6B8E9B]
                    clip-path-slant shadow-sm
                  ">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl md:text-8xl font-black text-black/5 dark:text-white/5 font-mono pointer-events-none group-hover:text-soviet-paper/10 transition-colors">
                      0{note.id}
                    </div>
                    <div className="relative z-10 flex-grow group-hover:text-soviet-paper transition-colors w-full">
                        <div className="flex items-center gap-2 md:gap-3 mb-2">
                           <span className="bg-soviet-black text-soviet-paper px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider group-hover:bg-soviet-cyan group-hover:text-black transition-colors dark:bg-soviet-paper dark:text-soviet-black">
                             {note.category}
                           </span>
                           <span className="font-mono text-[10px] md:text-xs opacity-60 font-bold group-hover:opacity-80 text-soviet-black dark:text-soviet-paper group-hover:text-soviet-paper">
                             // {note.date}
                           </span>
                        </div>
                        <h3 className="text-xl md:text-4xl font-black uppercase leading-tight mb-2 font-sans tracking-tight line-clamp-2 md:line-clamp-none text-soviet-black dark:text-soviet-paper group-hover:text-soviet-paper">
                          {language === Language.CN ? note.titleCN : note.title}
                        </h3>
                        <p className="font-serif italic text-xs md:text-sm opacity-70 group-hover:opacity-90 max-w-2xl line-clamp-2 text-soviet-black dark:text-soviet-paper group-hover:text-soviet-paper">
                          {note.desc}
                        </p>
                    </div>
                    <div className="relative z-10 hidden md:flex items-center justify-center">
                        <div className="w-12 h-12 border border-soviet-black dark:border-soviet-paper group-hover:border-soviet-cyan flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 bg-transparent group-hover:bg-soviet-cyan">
                           <Zap size={20} className="text-soviet-black dark:text-soviet-paper group-hover:text-black transition-all" />
                        </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* ================= DETAIL VIEW ================= */
            <motion.div
              key="detail"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="fixed inset-y-0 right-0 w-full md:w-[calc(100%-16rem)] pl-0 z-50 overflow-hidden flex flex-col md:flex-row bg-[#F4F4F4] dark:bg-[#111]"
            >
               {/* === BACKGROUND COLLISIONS (Constructivism) === */}
               <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                  {/* Red Triangle piercing Black Block */}
                  <div className="absolute top-[10%] right-[30%] w-[60vh] h-[60vh] bg-soviet-red mix-blend-multiply dark:mix-blend-overlay opacity-10" 
                       style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)', transform: 'rotate(-15deg)' }}></div>
                  
                  {/* Black Block */}
                  <div className="absolute top-[5%] right-[20%] w-[30vh] h-[80vh] bg-soviet-black dark:bg-soviet-paper opacity-5" 
                       style={{ transform: 'rotate(5deg)' }}></div>
                  
                  {/* Cyan Circle Intersecting */}
                  <div className="absolute bottom-[15%] left-[10%] w-[40vh] h-[40vh] rounded-full border-[30px] border-soviet-cyan opacity-10 mix-blend-multiply dark:mix-blend-screen"></div>
                  
                  {/* Constructivist Lines */}
                  <div className="absolute top-0 right-[25%] w-[2px] h-full bg-soviet-black/10 dark:bg-soviet-paper/10 rotate-12"></div>
                  <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-soviet-red/20 rotate-[-5deg]"></div>
               </div>

               {/* === LEFT COLUMN: CONTENT (Scrollable) === */}
               <div className="flex-grow h-full overflow-y-auto custom-scrollbar relative z-10 bg-transparent">
                  <div className="max-w-4xl mx-auto p-6 md:p-16 pb-32">
                     
                     {/* Back Button & Header */}
                     <div className="mb-12">
                        <button 
                            onClick={handleBack}
                            onMouseEnter={() => playSound(SoundType.HOVER)}
                            className="flex items-center gap-2 font-bold uppercase hover:text-soviet-red transition-colors group mb-8 text-soviet-black dark:text-soviet-paper"
                            data-hoverable="true"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="tracking-widest border-b-2 border-transparent group-hover:border-soviet-red">{t.notes.back}</span>
                        </button>

                        <div className="flex flex-wrap gap-4 mb-4">
                           <span className="bg-soviet-black text-soviet-paper px-3 py-1 font-mono font-bold text-sm uppercase">
                              {selectedNote.category}
                           </span>
                           <span className="border border-black dark:border-soviet-paper px-3 py-1 font-mono font-bold text-sm uppercase text-black dark:text-soviet-paper">
                              ID: #{selectedNote.id}
                           </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-black text-black dark:text-soviet-paper uppercase leading-[0.9] mb-6 drop-shadow-sm">
                           {language === Language.CN ? selectedNote.titleCN : selectedNote.title}
                        </h1>

                        <div className="flex items-start gap-4 text-black/70 dark:text-soviet-paper/70 font-serif italic text-sm md:text-lg border-l-4 border-soviet-red pl-4 bg-soviet-black/5 dark:bg-soviet-paper/5 p-4 backdrop-blur-sm">
                           <div className="mt-1"><Stamp size={20} className="text-soviet-red" /></div>
                           <p>{selectedNote.desc}</p>
                        </div>
                     </div>

                     {/* Article Body */}
                     <article className="prose prose-lg md:prose-xl max-w-none font-body text-soviet-black dark:text-soviet-paper">
                        <p className="font-mono text-xs md:text-sm mb-8 p-4 border border-dashed border-soviet-black/30 dark:border-soviet-paper/30 text-soviet-black/60 dark:text-soviet-paper/60 break-words">
                           [SYSTEM LOG]: Decrypting content stream...<br/>
                           [DATE]: {selectedNote.date}
                        </p>
                        <MarkdownRenderer content={selectedNote.content} searchQuery={searchQuery} />
                     </article>

                     {/* Footer Figure */}
                     <div className="my-16 relative group cursor-pointer border-2 border-soviet-black dark:border-soviet-paper p-1" data-hoverable="true" onMouseEnter={() => playSound(SoundType.HOVER)}>
                        <div className="h-32 bg-stripes opacity-10 flex items-center justify-center">
                           <span className="text-soviet-black dark:text-soviet-paper font-mono animate-pulse text-xs uppercase tracking-widest">
                              End of Record
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* === RIGHT COLUMN: TACTICAL SIDEBAR (Sticky & Collapsible) === */}
               <motion.div 
                  initial={{ width: 320 }}
                  animate={{ width: isSidebarCollapsed ? 64 : 320 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="hidden md:flex flex-col h-full border-l-4 border-soviet-black dark:border-soviet-paper bg-soviet-paper dark:bg-[#151515] relative z-20 shadow-[-10px_0_20px_rgba(0,0,0,0.1)] overflow-hidden"
               >
                  {/* Sidebar Header */}
                  <div className="bg-soviet-black text-soviet-paper p-4 flex items-center justify-between min-w-[320px] relative">
                     <div className={`flex items-center gap-2 transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                        <List size={16} className="text-soviet-red" /> 
                        <h3 className="font-black uppercase tracking-widest text-sm">Tactical Index</h3>
                     </div>
                     <button 
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className={`text-soviet-paper hover:text-soviet-red transition-colors absolute ${isSidebarCollapsed ? 'left-0 right-0 mx-auto flex justify-center' : 'right-4'}`}
                        data-hoverable="true"
                        onMouseEnter={() => playSound(SoundType.HOVER)}
                        title={isSidebarCollapsed ? "Expand" : "Collapse"}
                     >
                        {isSidebarCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                     </button>
                  </div>

                  {/* Content Container - Fixed Width to prevent reflow during collapse animation */}
                  <div className="relative flex-grow w-[320px]">
                      
                      {/* Collapsed State Icons overlay */}
                      <div className={`absolute inset-0 flex flex-col items-center mt-4 gap-6 transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'}`}>
                          <div className="p-2 bg-soviet-black/5 dark:bg-white/5 rounded-sm">
                            <Search size={20} className="text-soviet-black dark:text-soviet-paper opacity-50" />
                          </div>
                          <div className="w-8 h-[1px] bg-soviet-black/10 dark:bg-soviet-paper/10"></div>
                      </div>

                      {/* Expanded Content */}
                      <div className={`flex flex-col h-full transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                          {/* Search Module */}
                          <div className="p-4 border-b-2 border-soviet-black/10 dark:border-soviet-paper/10 bg-soviet-black/5 dark:bg-white/5">
                             <div className="relative">
                                <input 
                                   type="text" 
                                   placeholder="DATA_QUERY..." 
                                   value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)}
                                   className="w-full bg-transparent border-b-2 border-soviet-black dark:border-soviet-paper py-2 pl-8 pr-2 font-mono text-sm focus:outline-none focus:border-soviet-red transition-colors text-soviet-black dark:text-soviet-paper uppercase placeholder-soviet-black/30"
                                />
                                <Search size={14} className="absolute left-0 top-3 text-soviet-black/50 dark:text-soviet-paper/50" />
                             </div>
                          </div>

                          {/* TOC List */}
                          <div className="flex-grow overflow-y-auto custom-scrollbar p-4">
                             <div className="font-mono text-[10px] uppercase text-soviet-black/40 dark:text-soviet-paper/40 mb-4 tracking-widest">
                                /// SECTIONS DETECTED: {tableOfContents.length}
                             </div>
                             <ul className="space-y-1">
                                {tableOfContents.map((item, idx) => (
                                   <li key={idx}>
                                      <button 
                                         onClick={() => scrollToSection(item.id)}
                                         onMouseEnter={() => playSound(SoundType.HOVER)}
                                         className="w-full text-left group flex items-start gap-2 py-2 hover:bg-soviet-black/5 dark:hover:bg-white/5 transition-colors px-2 rounded-sm"
                                      >
                                         <ChevronRight size={14} className="mt-1 text-soviet-red opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                                         <span className="text-xs font-bold uppercase text-soviet-black dark:text-soviet-paper opacity-70 group-hover:opacity-100 transition-opacity">
                                            {item.text}
                                         </span>
                                      </button>
                                   </li>
                                ))}
                             </ul>
                          </div>

                          {/* Sidebar Footer */}
                          <div className="p-4 border-t-2 border-soviet-black/10 dark:border-soviet-paper/10">
                             <div className="flex items-center gap-2 opacity-50">
                                <Hash size={12} className="text-soviet-black dark:text-soviet-paper" />
                                <span className="text-[10px] font-mono text-soviet-black dark:text-soviet-paper">
                                   CHECKSUM: {selectedNote.content.length}
                                </span>
                             </div>
                          </div>
                      </div>
                  </div>

               </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Notes;
