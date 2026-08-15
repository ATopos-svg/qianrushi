
  (() => {
    const root=document.getElementById('mcu-ch2-bank');
    const C=(topic,page,q,answer,options,summary)=>({type:'choice',topic,page,q,answer,options,summary});
    const T=(topic,page,q,truth,why)=>({type:'tf',topic,page,q,answer:truth?0:1,options:[['正确',truth?'该说法与课件一致。'+why:'该说法不成立。'+why],['错误',truth?'选择错误会否定课件中的正确结论。'+why:'正确。'+why]],summary:why});
    const D=(topic,page,q,code,answer,points)=>({type:'code',topic,page,q,code,answer,points});
    const Q=[
      C('硬件组成',8,'AT89S52片内数据存储器RAM的容量是？',2,[['64B','过小，不是AT89S52的片内RAM容量。'],['128B','这是AT89S51的典型片内RAM容量。'],['256B','正确，AT89S52片内有256B RAM。'],['64KB','64KB是片外数据存储器最大扩展空间。']],'AT89S52片内RAM为256B，片外RAM最多可扩展64KB。'),
      C('硬件组成',8,'AT89S52片内Flash程序存储器容量是？',1,[['4KB','这是AT89S51的容量，不是AT89S52。'],['8KB','正确，地址范围0000H～1FFFH。'],['20KB','AT89S55可达到20KB。'],['64KB','64KB是总程序地址空间上限。']],'AT89S52片内Flash为8KB。'),
      C('硬件组成',9,'AT89S52片内有几个16位定时器/计数器？',2,[['1个','少于实际数量。'],['2个','AT89S51有2个，AT89S52增加了T2。'],['3个','正确，包括T0、T1和T2。'],['4个','课件未给出4个。']],'AT89S52比AT89S51多一个T2，共3个16位定时器/计数器。'),
      C('硬件组成',9,'AT89S52中断系统的典型配置是？',1,[['5个中断源、1级优先权','这是不完整的描述。'],['6个中断源、2级优先权','正确，新增T2中断源。'],['8个中断源、4级优先权','不符合本课件机型。'],['无中断系统','明显错误。']],'AT89S52具有6个中断源和2级中断优先权。'),
      C('硬件组成',9,'AT89S52片内串行口的性质是？',3,[['半双工同步串行口','课件描述为全双工异步串行口。'],['只能发送不能接收','全双工意味着可同时收发。'],['两个全双工串行口','AT89S52片内为1个。'],['1个全双工异步串行口','正确，并有4种工作方式。']],'片内串行口可用于串行通信、多机系统及扩展I/O。'),
      C('硬件组成',10,'特殊功能寄存器SFR的主要作用是？',0,[['管理、控制和监视片内外设','正确，SFR是外设控制与状态的集中接口。'],['只保存用户程序代码','程序代码存于程序存储器。'],['替代全部片外RAM','SFR不是通用大容量数据存储区。'],['产生外部电源','寄存器不能产生电源。']],'CPU通过SFR集中控制片内功能部件。'),
      C('硬件组成',10,'AT89S52共有多少个SFR？',2,[['8个','数量过少。'],['21个','是早期基本型常见描述，不是本课件AT89S52。'],['32个','正确。'],['256个','80H～FFH是地址区间，不代表全部地址都定义为SFR。']],'SFR映射在80H～FFH，但实际定义32个。'),
      C('硬件组成',10,'看门狗定时器WDT的核心用途是？',1,[['提高串口波特率','波特率由串口和定时器等配置决定。'],['程序跑飞或死循环时触发复位','正确，可使系统恢复执行。'],['扩大程序存储器','WDT不提供存储空间。'],['代替晶振','WDT依赖系统时钟计数。']],'WDT是提高系统抗干扰与自恢复能力的重要部件。'),

      C('引脚功能',15,'40引脚DIP封装中，VCC位于哪一脚？',3,[['9脚','9脚是RST。'],['18脚','18脚是XTAL2。'],['20脚','20脚是VSS。'],['40脚','正确，VCC接+5V。']],'VCC为40脚，VSS为20脚。'),
      C('引脚功能',15,'40引脚DIP封装中，VSS位于哪一脚？',1,[['18脚','18脚是XTAL2。'],['20脚','正确，VSS接数字地。'],['31脚','31脚是EA*/VPP。'],['40脚','40脚是VCC。']],'VSS是数字地，位于20脚。'),
      C('引脚功能',15,'采用外部时钟源时，外部时钟信号应接到？',0,[['XTAL1','正确，外部时钟源输入XTAL1。'],['XTAL2','XTAL2在外部时钟方式下悬空。'],['RST','RST是复位输入。'],['ALE','ALE是地址锁存允许信号。']],'外部时钟方式：XTAL1接时钟，XTAL2悬空。'),
      C('引脚功能',15,'采用外部时钟源时，XTAL2应如何处理？',2,[['接VCC','不应固定接高电平。'],['接地','不应固定接低电平。'],['悬空','正确。'],['接RST','两者功能无关。']],'课件明确指出外部时钟方式下XTAL2悬空。'),
      C('引脚功能',16,'使AT89S52可靠复位，RST脚高电平至少应持续？',1,[['半个机器周期','时间不足。'],['大于2个机器周期','正确，即大于24个时钟周期。'],['恰好1个时钟周期','时间不足。'],['任意短脉冲均可','不可靠。']],'复位有效条件是RST高电平持续大于2个机器周期。'),
      C('引脚功能',16,'EA*=1且PC位于0000H～1FFFH时，CPU通常从哪里取指？',0,[['片内8KB Flash','正确。'],['只能从片外RAM','程序不会从片外数据RAM取指。'],['SFR区','SFR保存控制状态，不保存程序。'],['P0口锁存器','I/O锁存器不是程序存储器。']],'EA*=1优先使用片内程序存储器，超出1FFFH后转片外。'),
      C('引脚功能',17,'EA*=0时，程序取指范围是？',3,[['只访问片内0000H～1FFFH','EA*=0会屏蔽片内程序存储器。'],['只访问片内RAM','RAM不是取指空间。'],['只能访问2000H～FFFFH','片外取指从0000H开始。'],['只访问片外程序存储器0000H～FFFFH','正确。']],'EA*=0表示全部程序从片外程序存储器执行。'),
      C('引脚功能',17,'ALE在访问外部存储器时的主要作用是？',2,[['锁存P2输出的高8位地址','P2高地址通常无需ALE锁存。'],['产生复位脉冲','复位由RST完成。'],['锁存P0先输出的低8位地址','正确，随后P0改作数据总线。'],['选择工作寄存器区','工作区由PSW的RS1、RS0选择。']],'P0低地址/数据分时复用，ALE用于锁存低8位地址。'),
      C('引脚功能',19,'正常运行且未禁止ALE时，ALE脉冲频率通常为？',1,[['fosc','不是每个振荡周期都输出一个ALE脉冲。'],['fosc/6','正确。'],['fosc/12','这是机器周期频率。'],['2fosc','不可能高于输入时钟。']],'ALE正常脉冲频率为晶振频率的1/6。'),
      C('引脚功能',20,'PSEN*的功能是？',0,[['片外程序存储器读选通，低有效','正确。'],['片外数据存储器写选通','写外部数据通常用P3.6/WR。'],['复位输入','复位输入是RST。'],['串口接收','串口接收是P3.0/RXD。']],'PSEN*专用于片外程序存储器读选通。'),
      C('引脚功能',20,'P0口作为通用I/O使用时，为什么通常需要外接上拉电阻？',3,[['因为P0内部上拉过强','P0通用I/O时没有内部上拉。'],['为了让其只能输出低电平','上拉是为了形成可靠高电平。'],['为了增加程序存储器容量','与存储容量无关。'],['P0输出级为漏极开路，高电平需外部上拉','正确。']],'P0作通用I/O时必须外加上拉，才成为准双向口。'),
      C('引脚功能',20,'扩展外部存储器时，P0口承担什么信号？',1,[['仅高8位地址','高8位地址由P2输出。'],['低8位地址与8位数据分时复用','正确。'],['仅控制信号','控制信号主要由ALE、PSEN、RD、WR等提供。'],['只作电源引脚','明显错误。']],'P0称为AD0～AD7复用地址/数据总线。'),
      C('引脚功能',21,'P1.0的第二功能是？',2,[['RXD','RXD是P3.0。'],['INT0','INT0是P3.2。'],['T2','正确，是定时器2外部计数输入。'],['WR','WR是P3.6。']],'AT89S52的P1.0复用为T2。'),
      C('引脚功能',21,'P1.1的第二功能T2EX主要用于？',0,[['T2捕捉/重装触发及方向控制','正确。'],['串口发送','串口发送是TXD。'],['程序存储器读选通','这是PSEN*。'],['复位输入','这是RST。']],'T2EX与定时器2的捕捉、重装及方向控制有关。'),
      C('引脚功能',23,'扩展外部存储器时，P2口通常输出？',1,[['低8位地址','低8位地址由P0先输出。'],['高8位地址','正确。'],['8位数据','数据总线主要由P0承担。'],['复位信号','复位由RST提供。']],'P2提供A8～A15，与锁存后的P0低地址构成16位地址。'),
      C('引脚功能',23,'P3.0的第二功能是？',2,[['TXD','TXD是P3.1。'],['INT0','INT0是P3.2。'],['RXD','正确，串行接收输入。'],['T0','T0是P3.4。']],'P3.0/RXD，P3.1/TXD。'),
      C('引脚功能',23,'P3.1的第二功能是？',0,[['TXD','正确，串行发送输出。'],['RXD','RXD是P3.0。'],['INT1','INT1是P3.3。'],['RD','RD是P3.7。']],'P3.1/TXD。'),
      C('引脚功能',23,'P3.2的第二功能是？',1,[['T1','T1是P3.5。'],['INT0','正确，外部中断0输入。'],['WR','WR是P3.6。'],['PSEN','PSEN是独立控制引脚。']],'P3.2/INT0。'),
      C('引脚功能',23,'P3.3的第二功能是？',3,[['RXD','RXD是P3.0。'],['T0','T0是P3.4。'],['RD','RD是P3.7。'],['INT1','正确，外部中断1输入。']],'P3.3/INT1。'),
      C('引脚功能',23,'P3.4和P3.5的第二功能分别是？',2,[['RXD、TXD','对应P3.0、P3.1。'],['INT0、INT1','对应P3.2、P3.3。'],['T0、T1','正确，是定时器0和1的外部计数输入。'],['WR、RD','对应P3.6、P3.7。']],'P3第二功能按RXD、TXD、INT0、INT1、T0、T1、WR、RD排列。'),
      C('引脚功能',23,'P3.6的第二功能是？',1,[['RD','RD是P3.7。'],['WR','正确，片外数据存储器写选通。'],['ALE','ALE是独立控制引脚。'],['T2','T2是P1.0。']],'P3.6/WR，低电平有效。'),
      C('引脚功能',23,'P3.7的第二功能是？',0,[['RD','正确，片外数据存储器读选通。'],['WR','WR是P3.6。'],['EA','EA是独立控制引脚。'],['T2EX','T2EX是P1.1。']],'P3.7/RD，低电平有效。'),

      C('CPU与PSW',26,'AT89S52的CPU主要由哪两部分构成？',1,[['RAM和Flash','它们是存储器。'],['运算器和控制器','正确。'],['定时器和串行口','它们是外围部件。'],['晶振和复位电路','它们属于系统支持电路。']],'CPU由运算器与控制器构成。'),
      C('CPU与PSW',27,'累加器A的主要作用不包括？',3,[['作为ALU输入数据源','是A的重要作用。'],['保存ALU运算结果','是A的重要作用。'],['作为大量数据传送的中转站','是A的重要作用。'],['保存程序计数地址','PC负责保存程序地址。']],'A是最常用的数据与运算寄存器，PC才管理取指地址。'),
      C('CPU与PSW',29,'PSW中的Cy标志表示？',0,[['进位或借位，并兼作位累加器','正确。'],['BCD辅助进位','这是Ac。'],['有符号溢出','这是OV。'],['A中1的奇偶性','这是P。']],'Cy可写为C，在位处理器中是位累加器。'),
      C('CPU与PSW',29,'PSW中的Ac标志在什么情况下最重要？',2,[['程序跳转','跳转主要受条件与PC控制。'],['串口收发','奇偶校验更直接相关。'],['BCD十进制调整','正确，反映D3向D4的进位或借位。'],['选择DPTR','由AUXR1的DPS选择。']],'Ac是辅助进位标志，用于BCD调整。'),
      C('CPU与PSW',29,'PSW中的F0是？',1,[['硬件固定为0的保留位','PSW.1才是保留位。'],['用户可设置和清除的通用标志位','正确。'],['片外存储器选择位','EA引脚负责程序存储器选择。'],['定时器溢出位','定时器有各自控制寄存器。']],'F0可由用户程序利用来控制流程。'),
      C('CPU与PSW',30,'RS1RS0=10时，当前工作寄存器区是哪一组？',2,[['0组：00H～07H','00对应0组。'],['1组：08H～0FH','01对应1组。'],['2组：10H～17H','正确。'],['3组：18H～1FH','11对应3组。']],'RS1RS0按00、01、10、11选择0～3组。'),
      C('CPU与PSW',31,'OV标志反映的是？',3,[['无符号数进位','主要看Cy。'],['A中1的个数','看P。'],['D3向D4进位','看Ac。'],['算术结果的有符号溢出','正确。']],'Cy与OV含义不同：一个偏无符号进位，一个反映有符号溢出。'),
      C('CPU与PSW',31,'若累加器A中“1”的个数为奇数，则P等于？',1,[['0','0表示1的个数为偶数。'],['1','正确。'],['不确定','P由A内容自动反映。'],['等于Cy','P与Cy不是同一标志。']],'P=1表示A中1的个数为奇数。'),
      C('CPU与PSW',32,'程序计数器PC的位数是？',2,[['8位','只能寻址256B，不符合64KB程序空间。'],['12位','只能寻址4KB。'],['16位','正确，可寻址64KB程序空间。'],['32位','AT89S52的PC不是32位。']],'16位PC决定了0000H～FFFFH程序地址范围。'),
      C('CPU与PSW',32,'AT89S52复位后PC的值为？',0,[['0000H','正确，从程序存储器起始地址取指。'],['0003H','这是外部中断0入口。'],['0007H','SP复位值为07H。'],['FFFFH','不是复位入口。']],'复位后从0000H开始执行。'),

      C('存储器与SFR',33,'AT89S52将程序存储器与数据存储器分开，并用不同指令访问，这属于？',1,[['冯·诺依曼结构','该结构程序和数据共享空间与总线。'],['哈佛结构','正确。'],['纯模拟结构','单片机是数字系统。'],['流水线缓存结构','不是这里强调的存储器组织。']],'程序与数据空间相互独立是哈佛结构的重要特征。'),
      C('存储器与SFR',35,'AT89S52最大程序存储器地址空间为？',3,[['256B','这是片内RAM容量。'],['8KB','这是片内Flash容量。'],['32KB','不是16位PC的完整空间。'],['64KB','正确，0000H～FFFFH。']],'片内加片外程序空间总范围不超过64KB。'),
      C('存储器与SFR',35,'AT89S52片内8KB Flash的地址范围是？',0,[['0000H～1FFFH','正确。'],['0000H～0FFFH','这是4KB范围。'],['2000H～FFFFH','这是EA=1时超出片内后常用的片外范围。'],['80H～FFH','这是内部RAM/SFR重叠地址区。']],'8KB等于2000H个字节，范围0000H～1FFFH。'),
      C('存储器与SFR',37,'外部中断0的中断入口地址是？',1,[['0000H','这是复位入口。'],['0003H','正确。'],['000BH','这是定时器0入口。'],['002BH','这是定时器2入口。']],'外部中断0向量地址为0003H。'),
      C('存储器与SFR',38,'AT89S52新增的定时器2中断入口地址是？',3,[['0013H','外部中断1入口。'],['001BH','定时器1入口。'],['0023H','串行口入口。'],['002BH','正确。']],'T2中断入口为002BH。'),
      C('存储器与SFR',38,'为什么通常在中断入口处放跳转指令，而不直接写完整中断服务程序？',2,[['中断入口不能执行任何指令','入口可以执行指令。'],['跳转指令能自动关闭电源','与电源无关。'],['相邻中断入口间隔很小，完整服务程序往往放不下','正确。'],['中断服务程序必须放在片外RAM','程序不能在片外数据RAM中执行。']],'中断向量区通常只作“跳板”。'),
      C('存储器与SFR',41,'片内RAM 00H～1FH区域主要用于？',0,[['4组工作寄存器区','正确，共32B。'],['SFR区','SFR映射在80H～FFH。'],['程序存储器','程序空间独立。'],['片外RAM映射','不是片外空间。']],'4组寄存器区每组8B，对应R0～R7。'),
      C('存储器与SFR',41,'片内RAM中可按位寻址的16B区域是？',1,[['00H～0FH','属于工作寄存器区的一部分。'],['20H～2FH','正确，共128个位。'],['30H～3FH','只能字节寻址。'],['80H～8FH','该地址同时涉及高RAM和SFR，但不是内部位RAM区。']],'20H～2FH既可字节寻址，也可位寻址。'),
      C('存储器与SFR',42,'访问高128B RAM（80H～FFH）应采用？',2,[['只能直接寻址','直接寻址会访问SFR区。'],['只能位寻址','高128B RAM不是这样区分。'],['间接寻址','正确。'],['MOVC查表寻址','MOVC用于程序存储器常数读取。']],'同地址的高RAM与SFR靠寻址方式区分。'),
      C('存储器与SFR',42,'访问80H～FFH范围内的SFR应采用？',0,[['直接寻址','正确。'],['间接寻址','会访问高128B RAM。'],['只允许寄存器寻址','不是唯一方式。'],['必须MOVX','MOVX访问片外数据空间。']],'SFR用直接寻址，高RAM用间接寻址。'),
      C('存储器与SFR',42,'AT89S52片外数据RAM最多可扩展到？',3,[['256B','这是片内RAM。'],['8KB','不是最大值。'],['32KB','没有用满16位地址。'],['64KB','正确。']],'片外数据空间可达64KB，并与片内RAM独立。'),
      C('存储器与SFR',43,'可位寻址SFR的字节地址通常满足什么规律？',1,[['末位只能是4H或CH','不符合课件规律。'],['末位是0H或8H','正确。'],['必须小于80H','SFR本就在80H以上。'],['必须是奇数地址','实际多为8的倍数地址。']],'例如P0=80H、TCON=88H、P1=90H、PSW=D0H。'),
      C('存储器与SFR',46,'AT89S52复位后SP的初值是？',2,[['00H','不是。'],['01H','不是。'],['07H','正确，首次压栈进入08H。'],['60H','60H是常建议的软件重设值。']],'默认SP=07H，但工程中常改到60H或更高。'),
      C('存储器与SFR',46,'为什么常在初始化时把SP改为60H或更高？',0,[['避免堆栈与工作寄存器区冲突','正确。'],['让PC从6000H开始执行','SP不控制程序执行地址。'],['开启串行口','串口由SCON等控制。'],['关闭WDT','WDT不由SP控制。']],'默认堆栈从08H开始，会占用1～3组工作寄存器区。'),
      C('存储器与SFR',47,'执行PUSH操作时，SP如何变化？',1,[['先减1','POP才使SP减1。'],['自动加1','正确，堆栈向高地址生长。'],['保持不变','压栈必须移动栈顶。'],['清零','不会自动清零。']],'AT89S52堆栈为向上生长型。'),
      C('存储器与SFR',48,'执行乘法指令后，16位乘积存放在哪里？',3,[['仅A中','A只能保存低8位。'],['仅B中','B只能保存高8位。'],['DPTR中','乘法结果不放DPTR。'],['BA中','正确，B为高字节、A为低字节。']],'乘法前两乘数在A、B，结果在BA。'),
      C('存储器与SFR',48,'执行除法指令后，商和余数分别存放在？',0,[['商在A、余数在B','正确。'],['商在B、余数在A','次序相反。'],['都在DPTR','错误。'],['都在PSW','PSW只保存状态标志。']],'DIV AB：A/B，商入A，余数入B。'),
      C('存储器与SFR',49,'AUXR中的DISALE=1表示？',2,[['ALE始终保持有效脉冲','DISALE=0才允许正常输出。'],['禁止所有外部存储器访问','MOVC/MOVX访问仍有效。'],['平时禁止ALE脉冲，但MOVC/MOVX访问外存时仍有效','正确。'],['选择DPTR1','DPTR由AUXR1的DPS选择。']],'DISALE可减少无外存访问时的ALE输出干扰。'),
      C('存储器与SFR',50,'选择DPTR1需要把哪个位设置为1？',1,[['PCON.IDL','IDL进入空闲模式。'],['AUXR1.DPS','正确。'],['PSW.Cy','Cy是进位标志。'],['AUXR.DISALE','用于ALE控制。']],'DPS=0选DPTR0，DPS=1选DPTR1。'),
      C('存储器与SFR',53,'AT89S52共有多少个可寻址位？',2,[['128个','仅是内部位RAM的位数。'],['91个','仅是SFR中已定义的可寻址位。'],['219个','正确，128+91。'],['256个','位地址范围到FFH不代表256位全定义。']],'位地址空间由内部位RAM的128位和SFR的91位组成。'),

      T('硬件组成',10,'AT89S52可在保留原有软硬件的基础上直接代换AT89C51/AT89S51。',true,'课件说明AT89S52与这些机型兼容。'),
      T('并行I/O口',20,'P0口作为通用I/O输出高电平时不需要任何外接上拉电阻。',false,'P0为漏极开路结构，作通用I/O时需要外接上拉。'),
      T('并行I/O口',21,'P1口内部具有上拉电阻。',true,'因此P1作输出时通常不需外接上拉。'),
      T('并行I/O口',71,'P2口输出高8位地址时，同一时刻仍可把这8位作为普通通用I/O自由使用。',false,'同一引脚承担地址总线时不能同时作为普通I/O。'),
      T('并行I/O口',76,'P3口第一功能和第二功能的切换由所执行的指令自动完成。',true,'用户通常无需另设专门模式寄存器。'),
      T('并行I/O口',25,'准双向口作为输入读取引脚前，通常应先向对应锁存器写1。',true,'写1使输出管截止，外部电平才能可靠送入输入缓冲器。'),
      T('并行I/O口',62,'P0口作为地址/数据总线时是真正的双向三态端口。',true,'它具有高、低和高阻悬浮三种状态。'),
      T('并行I/O口',64,'P0口作为通用I/O并外接上拉后，可视为准双向口。',true,'此时不再使用总线方式的高阻悬浮状态。'),
      T('并行I/O口',63,'“读锁存器”和“读引脚”得到的对象永远完全相同。',false,'读锁存器读内部Q状态，读引脚读外部实际电平，二者可能不同。'),
      T('引脚功能',22,'AT89S52的P1.0和P1.1在任何情况下都只能作为普通I/O。',false,'它们还可复用为T2和T2EX。'),
      T('时钟与时序',83,'经典AT89S52的一个机器周期由12个时钟周期组成。',true,'并分为S1～S6，每个状态两拍。'),
      T('时钟与时序',83,'晶振为6MHz时，一个机器周期为2μs。',true,'时钟周期约0.1667μs，12个时钟周期约2μs。'),
      T('时钟与时序',85,'乘法和除法指令通常占用4个机器周期。',true,'课件明确给出乘、除指令为4机器周期。'),
      T('时钟与时序',85,'课件所述三字节指令都是双机器周期。',true,'这是本章给出的指令周期规律。'),
      T('时钟与时序',80,'只要提高晶振频率，系统稳定性和PCB工艺要求就不会发生变化。',false,'更高频率会提高对存储器速度、布线和寄生电容的要求。'),
      T('时钟与时序',80,'晶体和微调电容应尽量靠近单片机，以减小寄生电容。',true,'这样有利于稳定、可靠起振。'),
      T('时钟与时序',81,'采用外部时钟方式时，XTAL1接外部方波，XTAL2悬空。',true,'这是课件给出的外部时钟连接方式。'),
      T('复位与最小系统',86,'RST高电平持续大于2个机器周期即可触发复位。',true,'也就是大于24个振荡周期。'),
      T('复位与最小系统',87,'AT89S52复位后P0～P3端口均输出低电平。',false,'复位后各端口锁存器为FFH，引脚为高电平。'),
      T('复位与最小系统',87,'AT89S52复位后SP=07H。',true,'因此首次压栈地址为08H。'),
      T('复位与最小系统',92,'AT89S52最小应用系统必须外接程序存储器才能运行。',false,'片内已有8KB Flash，外接时钟和复位电路即可构成最小系统。'),
      T('复位与最小系统',92,'外接时钟电路和复位电路是AT89S52最小系统的基本组成。',true,'芯片内部已有CPU、Flash、RAM和I/O。'),
      T('看门狗与低功耗',94,'WDT启动后，正常程序应定期“喂狗”清零。',true,'否则计数溢出会造成非预期复位。'),
      T('看门狗与低功耗',95,'WDT溢出可产生复位信号，使程序从0000H重新开始。',true,'这是其帮助系统摆脱跑飞和死循环的机制。'),
      T('看门狗与低功耗',96,'启动或清零WDT时，应先向WDTRST写E1H，再写1EH。',false,'正确顺序是先1EH，后E1H。'),
      T('看门狗与低功耗',100,'空闲模式下振荡器停止工作。',false,'空闲模式只关断CPU时钟，振荡器和片内外设仍运行。'),
      T('看门狗与低功耗',100,'空闲模式下定时器、串行口和中断系统仍可继续工作。',true,'因此可由中断唤醒CPU。'),
      T('看门狗与低功耗',102,'进入掉电模式后，片内RAM和SFR内容立即丢失。',false,'虽然振荡器和功能部件停止，但RAM与SFR内容保持。'),
      T('看门狗与低功耗',103,'外部中断可以唤醒掉电模式中的单片机。',true,'外部中断需采用低电平或下降沿触发。'),
      T('看门狗与低功耗',103,'硬件复位唤醒掉电模式后，程序从原停止位置继续。',false,'中断唤醒从停止处继续，复位唤醒则从0000H重新开始。'),

      D('代码与综合',46,'分析下列初始化语句的目的，并说明为什么常取60H或更大。','SP = 0x60;','该语句把堆栈指针SP初始化为60H。AT89S52复位后SP默认是07H，首次压栈进入08H，而08H～1FH属于第1～3组工作寄存器区，容易与寄存器区发生冲突。把SP改到60H或更高，可把堆栈放到普通内部RAM的较高地址区域。','关键点：默认SP=07H；堆栈向高地址生长；避免与工作寄存器区和常用变量冲突。'),
      D('代码与综合',67,'这两条语句用于读取P1外部引脚。为什么读取前要先写FFH？','P1 = 0xFF;\nvalue = P1;','P1是准双向口。先写FFH使各位锁存器为1，输出场效应管截止，端口才能由外部电路驱动；随后读取P1得到实际引脚电平。如果某位锁存器仍为0，该位会被内部输出级拉低，无法正确读取外部高电平。','关键点：准双向口；先写1；区分读引脚与读锁存器。'),
      D('代码与综合',96,'说明下列两条连续写操作的作用，以及它应在程序中如何使用。','WDTRST = 0x1E;\nWDTRST = 0xE1;','按先1EH、后E1H的顺序写WDTRST可启动或清零看门狗。启动后，正常程序必须在WDT溢出前周期性执行这组操作；若程序跑飞或死循环，无法按时清零，WDT溢出触发复位。','关键点：写入顺序不能颠倒；正常路径定期喂狗；异常路径靠溢出复位自恢复。'),
      D('代码与综合',100,'该语句会让单片机进入哪种模式？进入后哪些部分停止、哪些仍工作？','PCON |= 0x01;   // IDL = 1','PCON最低位IDL被置1，单片机进入空闲模式。CPU时钟被关断，CPU停止执行；振荡器仍运行，定时器、串行口和中断系统继续工作，RAM、SFR和端口状态保持。可由中断或硬件复位退出。','关键点：IDL是PCON.0；CPU停、外设继续；中断退出后进入中断服务程序。'),
      D('代码与综合',102,'该语句会让单片机进入哪种模式？与空闲模式相比有什么更深的节电效果？','PCON |= 0x02;   // PD = 1','PCON的PD位置1，进入掉电模式。振荡器停止，内部所有功能部件停止工作，功耗低于空闲模式；RAM、SFR和端口输出状态保持。可由外部中断或硬件复位唤醒。','关键点：PD是PCON.1；振荡器停止；中断唤醒继续原程序，复位唤醒从头执行。'),
      D('代码与综合',49,'分析该语句对ALE引脚的影响。它会不会导致外部存储器彻底无法访问？','AUXR |= 0x01;   // DISALE = 1','该语句把DISALE置1，禁止单片机在不访问外部存储器时持续输出ALE脉冲。但执行MOVC或MOVX、确实需要访问外部程序/数据存储器时，ALE仍然有效，所以不会彻底禁止外部存储器访问。','关键点：减少普通运行时ALE脉冲；MOVC/MOVX时仍有效；不等于关闭外存接口。'),
      D('代码与综合',50,'下列代码选择了哪一个数据指针？双DPTR设计有什么用途？','AUXR1 |= 0x01;  // DPS = 1','DPS置1后选择DPTR1；DPS为0时选择DPTR0。双DPTR便于在两个16位地址指针之间快速切换，例如进行片外数据块搬运时，一个指向源地址，另一个指向目的地址，减少反复保存和恢复指针的开销。','关键点：DPS=1选DPTR1；DPS=0选DPTR0；适合数据搬运和双地址操作。'),
      D('代码与综合',30,'假设只修改RS1、RS0而保留PSW其他位，说明该代码选择了哪组工作寄存器。','PSW = (PSW & 0xE7) | 0x10;','0xE7用于清除PSW.4和PSW.3，也就是RS1、RS0；再或上0x10得到RS1RS0=10，因此选择第2组工作寄存器，地址范围10H～17H。','关键点：RS1=1、RS0=0；选择第2组；R0～R7映射到10H～17H。'),
      D('代码与综合',83,'晶振为12MHz时，计算一个机器周期的时间；若某段循环恰好执行1000个机器周期，理想耗时是多少？','fosc = 12 MHz\n机器周期 = 12 × 时钟周期\n循环 = 1000 个机器周期','时钟周期Tosc=1/12MHz≈0.08333μs。一个机器周期包含12个时钟周期，因此机器周期为1μs。1000个机器周期的理想执行时间为1000μs，也就是1ms。实际软件延时还必须精确统计每条指令的机器周期。','关键点：Tosc=1/fosc；机器周期=12Tosc；12MHz时1机器周期=1μs。'),
      D('代码与综合',38,'解释这段中断向量代码的作用，并说明为什么不把完整服务程序直接放在0003H。','ORG 0000H\nLJMP MAIN\n\nORG 0003H\nLJMP INT0_ISR','复位后PC=0000H，第一条LJMP跳到主程序MAIN，避免主程序占用中断向量区。外部中断0发生时，硬件转到0003H，再由LJMP跳到真正的服务程序INT0_ISR。相邻中断入口只有8个字节左右的间隔，通常放不下完整服务程序，因此入口处一般只放跳转指令。','关键点：0000H是复位入口；0003H是外部中断0入口；向量区作跳板避免冲突。')
    ];

    const storageKey='mcu-chapter-2-progress-v1';
    const states=Q.map(()=>({selected:null,submitted:false,correct:false,mastered:null,response:''}));
    const mistakes=Q.map(()=>({attempts:0,lastSelected:null,mastered:false}));
    let wrongBookOpen=false;
    let order=Q.map((_,i)=>i), cursor=0;
    const $=s=>root.querySelector(s);
    const el={total:$('#c2-total'),pos:$('#c2-pos'),done:$('#c2-done'),score:$('#c2-score'),type:$('#c2-type'),topic:$('#c2-topic'),kind:$('#c2-kind'),topicLabel:$('#c2-topic-label'),page:$('#c2-page'),progress:$('#c2-progress'),question:$('#c2-question'),code:$('#c2-code'),options:$('#c2-options'),responseWrap:$('#c2-response-wrap'),response:$('#c2-response'),summary:$('#c2-summary'),prev:$('#c2-prev'),submit:$('#c2-submit'),master:$('#c2-master'),review:$('#c2-review'),next:$('#c2-next'),shuffle:$('#c2-shuffle'),retry:$('#c2-retry'),ask:$('#c2-ask'),askBtn:$('#c2-ask-btn'),feedback:$('#c2-feedback'),wrongCount:$('#c2-wrong-count'),wrongBookButton:$('#c2-wrong-book'),wrongList:$('#c2-wrong-list'),clearButton:$('#c2-clear'),savedNote:$('#c2-saved-note')};
    const labels={choice:'选择题',tf:'判断题',code:'代码/综合题'};
    [...new Set(Q.map(x=>x.topic))].forEach(t=>{const o=document.createElement('option');o.value=t;o.textContent=t;el.topic.appendChild(o);});
    const current=()=>order[cursor];
    function saveProgress(){try{localStorage.setItem(storageKey,JSON.stringify({order,cursor,states,mistakes,savedAt:new Date().toISOString()}));el.savedNote.textContent='已自动保存 · '+new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});}catch(error){el.savedNote.textContent='当前浏览器不允许保存进度';}}
    function loadProgress(){try{const saved=JSON.parse(localStorage.getItem(storageKey)||'null');if(!saved)return;if(Array.isArray(saved.order))order=saved.order;if(Number.isInteger(saved.cursor))cursor=Math.min(Math.max(saved.cursor,0),order.length-1);if(Array.isArray(saved.states))saved.states.forEach((s,i)=>{if(states[i]&&s)states[i]={...states[i],...s};});if(Array.isArray(saved.mistakes))saved.mistakes.forEach((m,i)=>{if(mistakes[i]&&m)mistakes[i]={...mistakes[i],...m};});if(saved.savedAt)el.savedNote.textContent='已恢复上次进度 · '+new Date(saved.savedAt).toLocaleString();}catch(error){el.savedNote.textContent='已有进度无法读取';}}
    function renderWrongBook(){const entries=mistakes.map((mistake,index)=>({mistake,index})).filter(x=>x.mistake.attempts>0);el.wrongCount.textContent=String(entries.length);el.wrongBookButton.textContent=entries.length?'查看错题本 ('+entries.length+')':'查看错题本';el.wrongList.hidden=!wrongBookOpen;el.wrongList.replaceChildren();if(!entries.length){const empty=document.createElement('div');empty.className='text-small text-muted';empty.textContent='还没有错题记录。提交错误答案后，这里会自动归档。';el.wrongList.appendChild(empty);return;}entries.forEach(({mistake,index})=>{const q=Q[index],card=document.createElement('article');card.className='wrong-item';card.innerHTML='<strong>第 '+(index+1)+' 题 · '+q.topic+'</strong><p>'+q.q+'</p><div class="wrong-meta">作答 '+(mistake.lastSelected===null?'未选择':String.fromCharCode(65+mistake.lastSelected))+' · 正确答案 '+(q.type==='tf'?(q.answer===0?'正确':'错误'):String.fromCharCode(65+q.answer))+' · '+(mistake.mastered?'已掌握':'待重练')+'</div>';el.wrongList.appendChild(card);});}

    const letter=i=>String.fromCharCode(65+i);
    function rebuild(){
      const type=el.type.value, topic=el.topic.value;
      order=Q.map((q,i)=>({q,i})).filter(x=>(type==='all'||x.q.type===type)&&(topic==='all'||x.q.topic===topic)).map(x=>x.i);
      cursor=0; render();
    }
    function render(){
      if(!order.length){el.question.textContent='当前筛选条件下没有题目。';return;}
      const i=current(),q=Q[i],s=states[i];
      const done=states.filter(x=>x.submitted||x.mastered!==null).length;renderWrongBook();
      const score=states.filter(x=>x.correct||x.mastered===true).length;
      el.total.textContent=String(order.length);el.pos.textContent=`${cursor+1} / ${order.length}`;el.done.textContent=String(done);el.score.textContent=String(score);
      el.kind.textContent=labels[q.type];el.topicLabel.textContent=q.topic;el.page.textContent=`课件第 ${q.page} 页`;el.progress.style.width=`${(cursor+1)/order.length*100}%`;el.question.textContent=q.q;
      el.code.hidden=q.type!=='code';el.code.querySelector('code').textContent=q.code||'';el.options.replaceChildren();el.responseWrap.hidden=q.type!=='code';el.response.value=s.response||'';
      if(q.type!=='code'){
        q.options.forEach((op,n)=>{const b=document.createElement('button');b.type='button';b.className='btn option';b.setAttribute('aria-pressed',String(s.selected===n));if(s.selected===n)b.classList.add('is-selected');if(s.submitted&&n===q.answer)b.classList.add('correct');if(s.submitted&&s.selected===n&&n!==q.answer)b.classList.add('wrong');b.innerHTML=`<span class="option-key">${q.type==='tf'?['√','×'][n]:letter(n)}</span><span><span>${op[0]}</span>${s.submitted?`<div class="option-note">${n===q.answer?'正确项：':'选项解析：'}${op[1]}</div>`:''}</span>`;b.disabled=s.submitted;b.addEventListener('click',()=>{s.selected=n;saveProgress();render();});el.options.appendChild(b);});
      }
      if(q.type==='code'&&s.submitted){el.summary.hidden=false;el.summary.dataset.state=s.mastered===false?'wrong':'correct';el.summary.innerHTML=`<strong>参考答案</strong><div class="answer-box">${q.answer}\n\n${q.points}</div>`;}
      else if(q.type!=='code'&&s.submitted){el.summary.hidden=false;el.summary.dataset.state=s.correct?'correct':'wrong';el.summary.innerHTML=`<strong>${s.correct?'回答正确':`回答错误，正确答案是 ${q.type==='tf'?(q.answer===0?'正确':'错误'):letter(q.answer)}`}</strong><div>${q.summary}</div>`;}
      else{el.summary.hidden=true;el.summary.textContent='';}
      el.prev.disabled=cursor===0;el.next.disabled=cursor===order.length-1;
      el.submit.hidden=false;el.submit.disabled=q.type==='code'?s.submitted:(s.submitted||s.selected===null);el.submit.textContent=q.type==='code'?(s.submitted?'已显示答案':'显示参考答案'):(s.submitted?'已提交':'提交答案');
      el.master.hidden=!(q.type==='code'&&s.submitted);el.review.hidden=!(q.type==='code'&&s.submitted);el.master.setAttribute('aria-pressed',String(s.mastered===true));el.review.setAttribute('aria-pressed',String(s.mastered===false));el.feedback.textContent='';
      if(window.lucide)window.lucide.createIcons({attrs:{width:16,height:16}});
    }
    el.submit.addEventListener('click',()=>{const i=current(),q=Q[i],s=states[i];if(q.type==='code'){s.response=el.response.value;s.submitted=true;}else if(s.selected!==null&&!s.submitted){s.submitted=true;s.correct=s.selected===q.answer;if(!s.correct){mistakes[i].attempts++;mistakes[i].lastSelected=s.selected;mistakes[i].mastered=false;}else if(mistakes[i].attempts)mistakes[i].mastered=true;}saveProgress();render();});
    el.response.addEventListener('input',()=>{states[current()].response=el.response.value;});
    el.master.addEventListener('click',()=>{const s=states[current()];s.mastered=true;render();});
    el.review.addEventListener('click',()=>{const s=states[current()];s.mastered=false;render();});
    el.prev.addEventListener('click',()=>{if(cursor>0){cursor--;saveProgress();render();}});el.next.addEventListener('click',()=>{if(cursor<order.length-1){cursor++;saveProgress();render();}});
    el.type.addEventListener('change',()=>{rebuild();saveProgress();});el.topic.addEventListener('change',()=>{rebuild();saveProgress();});el.wrongBookButton.addEventListener('click',()=>{wrongBookOpen=!wrongBookOpen;renderWrongBook();});el.clearButton.addEventListener('click',()=>{if(!window.confirm('清除本章的答题进度和错题记录？'))return;localStorage.removeItem(storageKey);location.reload();});
    el.shuffle.addEventListener('click',()=>{for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}cursor=0;render();});
    el.retry.addEventListener('click',()=>{const wrong=Q.map((q,i)=>({q,i,s:states[i]})).filter(x=>(x.q.type==='code'&&x.s.mastered===false)||(x.q.type!=='code'&&x.s.submitted&&!x.s.correct)).map(x=>x.i);if(!wrong.length){el.feedback.textContent='目前没有已记录的错题或待复习大题。';return;}wrong.forEach(i=>{states[i]={selected:null,submitted:false,correct:false,mastered:null,response:''};});order=wrong;cursor=0;saveProgress();render();});
    el.askBtn.addEventListener('click',async()=>{const text=el.ask.value.trim();if(!text){el.feedback.textContent='请先输入问题。';return;}const q=Q[current()];if(!window.openai||typeof window.openai.sendFollowUpMessage!=='function'){el.feedback.textContent='当前环境不支持直接追问，可在对话框中发送该问题。';return;}el.askBtn.disabled=true;el.feedback.textContent='正在准备追问…';try{await window.openai.sendFollowUpMessage({title:'追问第二章题目',prompt:`请基于《第2章 AT89S52单片机硬件结构》课件回答。当前题目：${q.q}\n课件依据：第${q.page}页。\n我的追问：${text}\n请重点说明寄存器、引脚或硬件工作过程，并指出考试易错点。`});el.ask.value='';el.feedback.textContent='追问已发送。';}catch(e){el.feedback.textContent='发送失败，请稍后重试。';}finally{el.askBtn.disabled=false;}});
    el.ask.addEventListener('keydown',e=>{if(e.key==='Enter')el.askBtn.click();});
    loadProgress();render();
  })();
  