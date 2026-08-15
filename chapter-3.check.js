
  (() => {
    const root=document.getElementById('mcu-ch3-bank');
    const C=(topic,page,q,answer,options,summary)=>({type:'choice',topic,page,q,answer,options,summary});
    const T=(topic,page,q,truth,why)=>({type:'tf',topic,page,q,answer:truth?0:1,options:[['正确',truth?'该说法与课件一致。'+why:'该说法不成立。'+why],['错误',truth?'选择错误会否定课件中的正确结论。'+why:'正确。'+why]],summary:why});
    const D=(topic,page,q,code,answer,points)=>({type:'code',topic,page,q,code,answer,points});
    const Q=[
      C('指令概述',4,'8051指令系统共有多少条基本指令？',2,[['49条','49条是单字节指令数量。'],['64条','64条是单机器周期指令数量。'],['111条','正确。'],['256条','8051指令系统不是256条基本指令。']],'8051共有111条基本指令。'),
      C('指令概述',5,'按指令所占字节数分类，数量关系正确的是？',0,[['单字节49条、双字节45条、三字节17条','正确，合计111条。'],['单字节64条、双字节45条、三字节2条','64和2是按机器周期分类时的数字。'],['单字节28条、双字节24条、三字节25条','这些数字接近按功能分类的数量。'],['三类各37条','课件并非平均分配。']],'字节长度分类为49、45、17。'),
      C('指令概述',5,'8051中需要4个机器周期的指令是？',3,[['MOV和MOVX','数据传送通常不是4周期。'],['INC和DEC','增减指令不是4周期。'],['LJMP和LCALL','它们通常为2周期。'],['MUL和DIV','正确，乘法和除法占4个机器周期。']],'乘、除是本章强调的4机器周期指令。'),
      C('指令概述',6,'一条汇编指令通常由哪两部分组成？',1,[['标号和注释','这是汇编语句字段，不是指令的核心组成。'],['操作码和操作数','正确。'],['地址线和数据线','这是硬件总线。'],['程序和数据存储器','这是存储器结构。']],'操作码说明做什么，操作数说明对谁操作。'),
      C('指令概述',18,'8051指令按功能分为几大类？',2,[['3类','少于实际分类。'],['4类','少于实际分类。'],['5类','正确：数据传送、算术、逻辑、控制转移、位操作。'],['7类','7是寻址方式数量。']],'五类功能指令构成完整指令系统。'),

      C('寻址方式',8,'指令“MOV A，R6”的源操作数采用什么寻址方式？',1,[['直接寻址','指令没有给出存储单元地址。'],['寄存器寻址','正确，源操作数就在R6中。'],['立即数寻址','没有#前缀。'],['位寻址','R6按字节操作。']],'Rn直接作为操作数时属于寄存器寻址。'),
      C('寻址方式',9,'指令“MOV A，40H”的源操作数采用什么寻址方式？',0,[['直接寻址','正确，40H直接给出片内RAM单元地址。'],['立即数寻址','若为立即数应写#40H。'],['寄存器间接寻址','若间接寻址应有@。'],['相对寻址','相对寻址用于转移。']],'40H表示地址，该地址中的内容送入A。'),
      C('寻址方式',10,'指令“MOV A，@R0”的源操作数采用？',2,[['寄存器寻址','若读取R0本身应写MOV A，R0。'],['直接寻址','没有直接给出数据单元地址。'],['寄存器间接寻址','正确，R0中存放操作数地址。'],['基址加变址寻址','没有A+DPTR或A+PC。']],'@表示通过寄存器内容间接找到操作数。'),
      C('寻址方式',11,'指令“MOV A，#40H”执行后A得到？',3,[['40H单元的内容','那是MOV A，40H。'],['R0指向单元的内容','那是MOV A，@R0。'],['程序存储器4040H处内容','不是MOVC查表。'],['立即数40H','正确，#表示常数本身。']],'#40H是存放在指令中的立即数。'),
      C('寻址方式',12,'“MOVC A，@A+DPTR”属于什么寻址方式？',1,[['相对寻址','它不是相对跳转。'],['基址寄存器加变址寄存器间接寻址','正确，DPTR为基址，A为变址。'],['位寻址','操作对象是字节。'],['寄存器直接寻址','有效地址来自两个寄存器相加。']],'有效地址=(DPTR)+(A)，访问程序存储器。'),
      C('寻址方式',14,'相对寻址中8位rel的有效范围是？',0,[['-128～+127','正确。'],['0～255且不能向后跳','rel按有符号补码解释，可前后跳。'],['-32768～+32767','这是16位有符号范围。'],['仅-8～+7','范围过小。']],'相对转移以转移指令下一条指令首地址为基准。'),
      C('寻址方式',15,'“MOV C，40H”中的40H应解释为？',2,[['内部RAM字节地址40H','目的操作数C是位变量，因此源也必须是位变量。'],['立即数40H','没有#前缀。'],['位地址40H','正确。'],['程序存储器地址40H','MOV C不从程序存储器取位。']],'判断地址是位还是字节，要结合指令和另一操作数类型。'),
      C('寻址方式',9,'访问SFR的唯一寻址方式是？',3,[['寄存器间接寻址','高RAM可间接访问，但SFR不能。'],['相对寻址','用于转移。'],['立即数寻址','立即数不是寄存器地址访问。'],['直接寻址','正确。']],'SFR位于直接地址80H～FFH范围。'),
      C('寻址方式',10,'内部RAM寄存器间接寻址可使用哪些工作寄存器？',1,[['R0～R7任意一个','8051只允许R0或R1作Ri。'],['R0或R1','正确。'],['只允许R7','错误。'],['只能DPTR','DPTR主要用于片外数据或查表。']],'Ri在指令系统中专指R0、R1。'),
      C('寻址方式',23,'“MOV DPTR，#data16”中DPTR的宽度是？',2,[['8位','DPTR由DPH和DPL组成。'],['11位','11位地址用于AJMP/ACALL。'],['16位','正确。'],['32位','8051 DPTR不是32位。']],'DPTR可一次装入16位立即数。'),
      C('寻址方式',16,'判断一条双操作数指令的寻址方式时，通常以哪个操作数为参照？',0,[['源操作数','正确，例如MOV A，#40H通常称立即数寻址。'],['目的操作数','目的也有自己的寻址方式，但一般命名以源为主。'],['操作码','操作码不是操作数寻址。'],['注释字段','注释不参与执行。']],'一条指令中两个操作数可能采用不同寻址方式。'),
      C('寻址方式',65,'“JMP @A+DPTR”最适合实现？',3,[['BCD调整','使用DA A。'],['堆栈恢复','使用POP。'],['定时延时','通常用循环或定时器。'],['多分支散转','正确，A选择分支，DPTR给出基地址。']],'该指令通过A的不同值跳向不同入口。'),

      C('数据传送',20,'MOV指令执行后，源操作数通常如何变化？',2,[['被清零','MOV不清除源。'],['与目的操作数交换','交换使用XCH。'],['保持不变','正确，MOV是复制而非搬家。'],['自动加1','MOV本身不自增。']],'数据传送修改目的操作数，不改变源操作数。'),
      C('数据传送',20,'普通MOV类指令通常不影响哪组标志？',1,[['只不影响P','A变化会使P随之更新。'],['Cy、Ac和OV','正确。'],['所有标志包括P','P与累加器A内容有关。'],['只不影响Cy','Ac、OV也通常不受影响。']],'MOV不影响Cy、Ac、OV，但A变化可能导致P改变。'),
      C('数据传送',23,'哪条指令可把16位立即数一次装入数据指针？',0,[['MOV DPTR，#data16','正确。'],['MOV A，#data16','A只有8位。'],['MOVX DPTR，#data16','没有这种指令格式。'],['MOVC DPTR，@A+PC','MOVC目的只能是A。']],'DPTR由DPH和DPL组成，支持16位立即数装载。'),
      C('数据传送',26,'执行PUSH direct时，正确的操作次序是？',3,[['先写数据再SP减1','这是错误的方向。'],['SP先减1再写数据','堆栈向高地址生长。'],['先写数据再SP加1','数据应写入新的栈顶。'],['SP先加1，再把direct内容写入新栈顶','正确。']],'PUSH：SP←SP+1，再压入数据。'),
      C('数据传送',27,'执行POP direct时，正确描述是？',1,[['SP先加1再读取','方向错误。'],['先取出SP所指数据，再使SP减1','正确。'],['清空整个堆栈','POP只弹出一个字节。'],['只允许弹出到A','目的可为直接地址，如DPH、Acc等。']],'POP先读当前栈顶，再SP减1。'),
      C('数据传送',27,'访问片外数据RAM或扩展I/O应使用哪类指令？',2,[['MOVC','MOVC读取程序存储器。'],['普通MOV','普通MOV用于片内数据传送。'],['MOVX','正确，X表示外部数据空间。'],['XCHD','XCHD交换半字节。']],'MOVX通过RD/WR信号访问片外数据空间。'),
      C('数据传送',28,'采用“MOVX A，@DPTR”可寻址多大片外数据空间？',0,[['64KB','正确，DPTR提供16位地址。'],['256B','这是使用@Ri时的直接范围。'],['8KB','不是DPTR的完整寻址范围。'],['128B','这是经典8051片内RAM容量。']],'DPTR的高低字节分别经P2和P0形成16位地址。'),
      C('数据传送',28,'采用“MOVX A，@R0”时，R0直接提供几位地址？',3,[['16位','R0只有8位。'],['11位','AJMP/ACALL使用11位目的地址。'],['4位','过小。'],['8位','正确，可直接选择256个单元。']],'@Ri访问片外空间时，Ri提供低8位地址。'),
      C('数据传送',29,'MOVC指令读取的是？',1,[['片外数据RAM','片外数据用MOVX。'],['程序存储器中的常数或表格','正确。'],['堆栈栈顶','使用POP。'],['端口锁存器','使用相应I/O指令。']],'C表示CODE，MOVC只读程序存储器。'),
      C('数据传送',30,'与“MOVC A，@A+PC”相比，“MOVC A，@A+DPTR”的主要优势是？',2,[['不需要累加器A','两者都用A作变址。'],['只能查256B以内的表','这是A+PC方式的限制。'],['表格位置更自由，可在64KB程序空间内安排','正确。'],['可以写程序存储器','MOVC只能读。']],'DPTR独立给出表首地址，便于共享和远距离查表。'),
      C('数据传送',32,'XCH指令的功能是？',3,[['把源复制给目的，源不变','这是MOV。'],['只交换低4位','这是XCHD。'],['累加器清零','这是CLR A。'],['累加器A与指定字节互换','正确。']],'XCH为完整8位交换。'),
      C('数据传送',33,'XCHD A，@R0交换的是？',1,[['A和RAM单元的全部8位','那是XCH。'],['二者的低4位，高4位各自保持','正确。'],['二者的高4位','XCHD交换低半字节。'],['A与R0寄存器本身','@R0表示R0指向的RAM单元。']],'XCHD常用于BCD数或半字节处理。'),

      C('算术运算',35,'ADD指令的运算结果总是存入？',0,[['累加器A','正确。'],['寄存器B','B主要配合乘除。'],['DPTR','ADD不以DPTR为结果寄存器。'],['源操作数','源操作数不被改写。']],'8051的8位加法以A为一个加数和结果寄存器。'),
      C('算术运算',36,'ADD可能影响的主要PSW标志是？',2,[['只有P','P会随A变化，但不是全部。'],['RS1和RS0','工作寄存器选择位不由ADD改变。'],['Cy、Ac、OV以及随A变化的P','正确。'],['F0和RS0','这些位不会自动由ADD修改。']],'进位、辅助进位、有符号溢出和奇偶性是重点。'),
      C('算术运算',37,'已知A=53H，R0=FCH，执行ADD A，R0后A和Cy为？',1,[['A=4FH，Cy=0','53H+FCH超过FFH。'],['A=4FH，Cy=1','正确，结果低8位为4FH并产生进位。'],['A=14FH，Cy=0','A只能保存低8位。'],['A=AFH，Cy=1','加法结果错误。']],'53H+FCH=14FH，A取4FH，Cy=1。'),
      C('算术运算',39,'ADDC与ADD的关键区别是？',3,[['ADDC不使用A','二者都以A为结果。'],['ADDC不影响任何标志','它同样影响算术标志。'],['ADDC只能加立即数','也支持Rn、direct和@Ri。'],['ADDC把原Cy也作为加数','正确。']],'ADDC适合多字节加法的高字节运算。'),
      C('算术运算',41,'INC指令对Cy的影响是？',0,[['不影响Cy','正确，包括INC DPTR也不影响Cy。'],['变量溢出时Cy必置1','INC不会自动设置Cy。'],['每次都清Cy','错误。'],['每次都取反Cy','错误。']],'增1、减1指令不影响Cy、Ac、OV。'),
      C('算术运算',41,'执行INC DPTR，若DPTR=12FFH，结果是？',2,[['1200H','低字节溢出应向高字节进位。'],['13FFH','不是只增加高字节。'],['1300H','正确。'],['12FEH','这是减1方向。']],'INC DPTR完成16位加1，但不影响Cy。'),
      C('算术运算',42,'DA A指令主要用于？',1,[['二进制减法借位处理','不是。'],['压缩BCD码加法结果的十进制调整','正确。'],['普通二进制乘法','使用MUL AB。'],['把A转换为ASCII码','不是自动ASCII转换。']],'BCD加法后根据半字节及Ac、Cy条件加6调整。'),
      C('算术运算',47,'SUBB A，#data执行的运算是？',3,[['A+data','这是ADD。'],['A-data，不考虑Cy','8051减法指令必须考虑Cy借位。'],['data-A-Cy','方向相反。'],['A-data-Cy','正确。']],'使用SUBB前要明确当前Cy是否已清零。'),
      C('算术运算',49,'若某字节原值00H，执行DEC后得到？',0,[['FFH','正确，发生下溢但不影响Cy。'],['01H','这是INC。'],['00H','数值会改变。'],['产生16位FFFFH','操作对象只有8位。']],'DEC按8位环绕，00H减1得到FFH。'),
      C('算术运算',50,'执行MUL AB后，乘积的高、低字节分别位于？',2,[['A高、B低','次序相反。'],['都在A','16位积可能放不下。'],['B高、A低','正确。'],['DPH高、DPL低','结果不放DPTR。']],'MUL AB：A×B→BA，并且Cy清0。'),
      C('算术运算',50,'执行DIV AB后，商和余数分别位于？',1,[['B中存商，A中存余数','次序相反。'],['A中存商，B中存余数','正确。'],['都在A','余数需要B保存。'],['都在DPTR','错误。']],'除数B为0时结果不定且OV=1。'),

      C('逻辑与位操作',51,'CLR A执行后？',3,[['A按位取反','这是CPL A。'],['A左移一位','这是RL/RLC。'],['A与B交换','没有这种作用。'],['A清零','正确。']],'CLR A不影响Cy、Ac、OV。'),
      C('逻辑与位操作',51,'CPL A的功能是？',1,[['A加1','使用INC A。'],['A逐位求反','正确。'],['A高低半字节交换','使用SWAP A。'],['A清零','使用CLR A。']],'每一位0变1、1变0。'),
      C('逻辑与位操作',53,'RLC A与RL A的区别是？',0,[['RLC把Cy作为第9位参与循环','正确。'],['RL会把A清零','错误。'],['RLC只能右移','RLC是左移。'],['RL会自动设置OV','RL不影响OV。']],'带C的循环移位会读写进位标志。'),
      C('逻辑与位操作',54,'RRC A执行时，A的最低位移入哪里？',2,[['A的最高位直接循环','这是RR A的行为。'],['OV','不进入OV。'],['Cy','正确，同时原Cy移入A最高位。'],['B的最低位','B不参与。']],'RRC把A与Cy组成9位环进行右移。'),
      C('逻辑与位操作',55,'若A=95H，执行SWAP A后结果为？',3,[['A5H','不是简单反转位序。'],['59H并影响Cy','结果对但SWAP不影响Cy。'],['95H','高低半字节会交换。'],['59H','正确。']],'95H高半字节9和低半字节5互换得到59H。'),
      C('逻辑与位操作',55,'ANL指令实现？',0,[['按位逻辑与','正确。'],['按位逻辑或','使用ORL。'],['按位异或','使用XRL。'],['算术加法','使用ADD。']],'ANL常用于屏蔽或清除指定比特。'),
      C('逻辑与位操作',60,'若A=90H，R3=73H，执行XRL A，R3后A为？',1,[['E1H','异或计算错误。'],['E3H','正确。'],['63H','不是异或结果。'],['F3H','计算错误。']],'90H XOR 73H = E3H。'),

      C('转移与调用',62,'LJMP可以跳转到？',0,[['64KB程序空间任意地址','正确。'],['只能当前2KB页内','这是AJMP限制。'],['只能前后128B','这是相对转移范围。'],['片外数据RAM地址','跳转目标属于程序空间。']],'LJMP使用16位目的地址。'),
      C('转移与调用',63,'SJMP目的地址的计算基准是？',2,[['当前指令首地址','还要先越过本指令。'],['程序存储器0000H','不是固定基准。'],['SJMP下一条指令的首地址','正确，再加有符号rel。'],['DPTR内容','SJMP不使用DPTR。']],'SJMP为2字节，先PC+2，再加rel。'),
      C('转移与调用',65,'AJMP的有效转移范围是？',1,[['前后128B','这是相对转移。'],['与下一条指令处于同一2KB区域','正确。'],['整个64KB','这是LJMP。'],['仅256B','不是。']],'AJMP目的地址高5位必须与下一条指令地址高5位相同。'),
      C('转移与调用',66,'JZ rel判断的条件是？',3,[['Cy=0','这是JNC。'],['某位为0','使用JNB。'],['R0=0','JZ只检查A。'],['累加器A=0','正确。']],'JZ/JNZ不检查通用寄存器，只检查A。'),
      C('转移与调用',67,'执行CJNE比较两个无符号数时，若第一操作数小于第二操作数，则？',0,[['Cy置1','正确。'],['Cy清0','第一操作数不小于第二操作数时才清0。'],['两个操作数自动交换','CJNE不修改操作数。'],['不发生转移','只要不相等就转移。']],'CJNE同时实现不等转移和无符号大小比较。'),
      C('转移与调用',67,'DJNZ R2，LOOP的功能是？',2,[['R2加1后无条件跳转','方向和条件都错。'],['只判断R2但不修改','DJNZ会先减1。'],['R2减1，结果不为0则跳转','正确。'],['R2清零后跳转','错误。']],'DJNZ常用作已知次数的循环控制。'),
      C('转移与调用',68,'LCALL执行时压入堆栈的是？',1,[['子程序首地址','子程序首地址装入PC。'],['调用指令下一条指令的地址','正确，即返回断点。'],['当前A的内容','不会自动保护A。'],['所有SFR内容','现场需程序自行保护。']],'LCALL先PC+3形成断点，再压栈并转向子程序。'),
      C('转移与调用',70,'RET与RETI的关键区别是？',3,[['RET只用于长调用','RET可返回各种普通子程序调用。'],['RETI不恢复PC','两者都会从栈中恢复PC。'],['RET会清除中断优先级状态','恰好相反。'],['RETI还清除中断响应的内部优先级状态','正确。']],'普通子程序用RET，中断服务程序用RETI。'),

      C('汇编与程序设计',103,'ORG伪指令的作用是？',1,[['结束汇编','使用END。'],['规定程序段的汇编起始地址','正确。'],['定义一个字节','使用DB。'],['调用子程序','使用CALL指令。']],'ORG可多次出现，但地址段应按从小到大排列且不能交叉。'),
      C('汇编与程序设计',105,'整个源程序中通常只能有一条并位于最后的伪指令是？',0,[['END','正确。'],['ORG','ORG可多次出现。'],['DB','DB可多次定义数据。'],['EQU','EQU可定义多个符号。']],'END之后的源程序不再汇编。'),
      C('汇编与程序设计',106,'DB伪指令用于？',2,[['定义16位数据字','使用DW。'],['保留存储区但不定义内容','使用DS。'],['从指定地址连续定义字节数据','正确。'],['给位变量赋地址','使用BIT。']],'DB可定义数值和字符的ASCII码。'),
      C('汇编与程序设计',116,'普通子程序最后通常必须使用？',3,[['RETI','用于中断返回。'],['SJMP','不能自动恢复断点。'],['END','这是汇编终止伪指令。'],['RET','正确。']],'RET从堆栈恢复调用断点。'),
      C('汇编与程序设计',145,'已知循环次数时，最常用的循环控制指令是？',1,[['MOVC','用于查表。'],['DJNZ','正确，将减1与非零转移结合。'],['RETI','用于中断返回。'],['SWAP','用于半字节交换。']],'循环次数未知时通常改用条件判断控制。'),

      T('指令概述',5,'8051属于复杂指令集，基本指令共111条。',true,'课件将其描述为复杂指令集。'),
      T('寻址方式',11,'立即数前必须使用“#”作为前缀。',true,'否则同样的数值可能被解释为直接地址。'),
      T('寻址方式',9,'直接寻址既可访问低128B内部RAM，也可访问SFR。',true,'SFR只能使用直接寻址访问。'),
      T('寻址方式',10,'寄存器间接寻址内部RAM时，可以在@后使用R0～R7中的任意寄存器。',false,'Ri只允许R0或R1。'),
      T('数据传送',20,'MOV的含义是把数据从源单元搬走，因此执行后源单元被清零。',false,'MOV是复制，源操作数保持不变。'),
      T('数据传送',25,'堆栈遵循后进先出原则。',true,'最后压入的数据最先弹出。'),
      T('数据传送',26,'PUSH操作先使SP加1，再写入数据。',true,'堆栈向高地址方向生长。'),
      T('数据传送',27,'POP操作先把SP减1，再读取数据。',false,'应先读取当前栈顶，再使SP减1。'),
      T('数据传送',28,'MOVX用于访问片内低128B RAM。',false,'MOVX访问片外数据RAM或扩展I/O。'),
      T('数据传送',29,'MOVC可以把累加器中的数据写入程序存储器。',false,'MOVC是从程序存储器单向读取到A。'),
      T('数据传送',30,'MOVC A，@A+PC查表时，表格位置受到当前指令附近256B范围的限制。',true,'A为8位无符号偏移，且基址是下一条指令地址。'),
      T('数据传送',31,'MOVC A，@A+DPTR的查表位置与该指令自身所在地址无关。',true,'有效地址只取决于A和DPTR。'),
      T('数据传送',33,'XCHD交换A与间接寻址单元的完整8位内容。',false,'XCHD只交换双方低4位。'),
      T('算术运算',34,'ADD和SUBB可能改变Cy、Ac和OV。',true,'这些是算术运算的核心状态标志。'),
      T('算术运算',41,'INC DPTR发生低字节溢出时会使Cy置1。',false,'INC DPTR完成16位增1，但不影响Cy。'),
      T('算术运算',42,'DA A用于压缩BCD码加法后的十进制调整。',true,'它根据半字节值及Ac、Cy进行加6修正。'),
      T('算术运算',47,'执行普通8位减法前，如果不需要减去借位，通常应先清Cy。',true,'SUBB总会把Cy作为借位一起减去。'),
      T('算术运算',50,'MUL AB执行后Cy总是清0。',true,'积大于255时由OV反映高字节非零。'),
      T('算术运算',50,'DIV AB中若B=0，结果仍然确定且OV=0。',false,'除数为0时A、B结果不定，OV置1。'),
      T('逻辑与位操作',52,'RL A会把A的最高位移入Cy。',false,'RL只在A内部循环，不经过Cy；RLC才经过Cy。'),
      T('逻辑与位操作',53,'RLC和RRC把A与Cy看作9位整体进行循环移位。',true,'原Cy与A的边界位互相交换位置。'),
      T('逻辑与位操作',55,'SWAP A会影响Cy和OV。',false,'SWAP只交换A的高低半字节，不影响这些标志。'),
      T('逻辑与位操作',73,'JBC bit，rel在bit=1时跳转，并把该位清0。',true,'它把测试、转移和清零组合在一条指令中。'),
      T('转移与调用',62,'LJMP只能在当前2KB区域内跳转。',false,'LJMP可以跳到64KB程序空间任意地址。'),
      T('转移与调用',65,'AJMP的目的地址必须与下一条指令位于同一2KB区域。',true,'因为PC高5位保持不变。'),
      T('转移与调用',67,'CJNE执行比较后会修改两个被比较操作数。',false,'CJNE不修改操作数，只影响转移和Cy。'),
      T('转移与调用',67,'DJNZ会影响Cy标志。',false,'DJNZ完成减1和判断，但不影响Cy。'),
      T('转移与调用',70,'普通子程序可以使用RETI返回，效果与RET完全相同。',false,'RETI还处理内部中断优先级状态，只应由中断服务程序使用。'),
      T('特殊说明',86,'INC P1、ANL P1，A和CPL P3.0属于读—修改—写指令，读取的是端口锁存器。',true,'这类指令需要以前一输出状态为基础修改。'),
      T('特殊说明',88,'INC A与INC Acc汇编后机器代码和指令长度完全相同。',false,'INC A为隐含A的单字节指令，INC Acc按直接地址E0H汇编为双字节。'),

      D('代码与综合',9,'执行下列程序后，A、40H和R0的值分别是什么？并指出每条MOV的寻址方式。','MOV 40H，#25H\nMOV R0，#40H\nMOV A，@R0','第一条把立即数25H写入内部RAM 40H；第二条把立即数40H写入R0；第三条通过R0间接访问40H单元，把25H送入A。最终A=25H，(40H)=25H，R0=40H。前两条源操作数是立即数寻址，第三条源操作数是寄存器间接寻址。','关键点：区分40H、#40H和@R0；MOV是复制，R0与40H内容均不会因最后一条指令被清除。'),
      D('代码与综合',26,'已知SP=60H、A=30H、B=70H，分析执行后的SP、61H、62H以及DPTR。','PUSH Acc\nPUSH B\nPOP DPH\nPOP DPL','PUSH Acc后SP=61H，(61H)=30H；PUSH B后SP=62H，(62H)=70H。POP DPH先取70H到DPH，SP减为61H；POP DPL再取30H到DPL，SP减为60H。最终DPTR=7030H，SP=60H。','关键点：PUSH先加SP；POP先取数再减SP；堆栈后进先出。'),
      D('代码与综合',37,'计算下列加法执行后的A、Cy、Ac、OV和P。','MOV A，#53H\nMOV R0，#0FCH\nADD A，R0','53H+FCH=14FH，所以A=4FH，Cy=1。低半字节3H+CH=FH，没有从D3向D4进位，因此Ac=0。位6和位7均产生进位，所以OV=0。4FH中1的个数为5个，故P=1。','关键点：Cy看最高位进位；Ac看D3到D4；OV看位6进位与位7进位是否不同；P看结果A。'),
      D('代码与综合',39,'说明这段程序实现的运算。若R3R2=12FFH、R5R4=0102H，结果是多少？','MOV A，R2\nADD A，R4\nMOV R6，A\nMOV A，R3\nADDC A，R5\nMOV R7，A','程序实现两个16位无符号数R3R2与R5R4相加，结果放入R7R6。低字节FFH+02H=101H，所以R6=01H并产生Cy=1；高字节12H+01H+1=14H，所以R7=14H。最终R7R6=1401H。','关键点：低字节用ADD产生进位，高字节必须用ADDC把Cy加入。'),
      D('代码与综合',45,'把A=56H、R5=67H看作压缩BCD数，分析两条指令执行结果。','ADD A，R5\nDA A','二进制加法先得到BDH。由于低半字节大于9，需要加06H；高半字节也需要十进制修正，DA A自动完成调整，最终A=23H，Cy=1，表示十进制结果123。','关键点：DA A只能用于BCD加法后的调整；最终的进位Cy代表百位进位。'),
      D('代码与综合',31,'设DPTR=8100H、A=40H，说明该指令从哪里取数，哪些空间和信号参与。','MOVC A，@A+DPTR','有效地址=8100H+0040H=8140H。CPU从程序存储器8140H单元读取一个字节送入A。该指令不访问数据RAM；若访问片外程序存储器，PSEN*读选通信号有效。','关键点：MOVC读CODE空间；A是无符号变址；DPTR是16位基址。'),
      D('代码与综合',67,'分析比较结果和转移条件。假设A=20H。','CJNE A，#30H，LESS\nMOV R0，#00H\nSJMP DONE\nLESS：MOV R0，#01H\nDONE：NOP','A与30H不相等，因此跳到LESS；又因为20H小于30H，Cy置1。最终R0=01H，A仍为20H。CJNE不修改两个比较操作数。','关键点：不相等决定是否跳；无符号大小决定Cy；两种效果要分开判断。'),
      D('代码与综合',97,'分析循环结束后的A和R1。这段程序完成了什么功能？','MOV A，#00H\nMOV R1，#10\nMOV R2，#03H\nLOOP：ADD A，R2\nDJNZ R1，LOOP','R1初值为十进制10。循环每次把03H加到A，并把R1减1；共执行10次。最终A=1EH（十进制30），R1=00H。程序实现3的10次累加，也就是3×10。','关键点：#10默认是十进制10；DJNZ先减1再判断；循环体执行次数等于初值。'),
      D('代码与综合',116,'指出这段子程序结构中的现场保护顺序是否正确，并解释RET的作用。','SUB：\n  PUSH PSW\n  PUSH Acc\n  ; 子程序主体\n  POP Acc\n  POP PSW\n  RET','保护与恢复顺序正确：先压PSW、后压Acc，恢复时先弹Acc、后弹PSW，符合后进先出。RET再从堆栈中弹出调用时保存的返回地址送入PC，使程序从LCALL/ACALL下一条指令继续。','关键点：现场恢复必须与保护顺序相反；RET不等于RETI；是否保护哪些寄存器取决于子程序实际修改内容。'),
      D('代码与综合',122,'说明ADD A，#01H在这个查平方表子程序中的作用。若进入时A=02H，最终查得什么？','ADD A，#01H\nMOVC A，@A+PC\nRET\nDB 00H，01H，04H，09H，10H\nDB 19H，24H，31H，40H，51H','MOVC A，@A+PC使用执行后指向下一条指令RET的PC作为基址，而平方表在RET之后，因此先给A加1跳过RET这个1字节偏移。进入时A=02H，加1后为03H，PC指向RET，PC+03H正好落到表中x=2对应的04H，最终A=04H。','关键点：A中既含自变量偏移，也要补偿查表指令与表首之间的字节数。')
    ];

    const storageKey='mcu-chapter-3-progress-v1';
    const states=Q.map(()=>({selected:null,submitted:false,correct:false,mastered:null,response:''}));
    const mistakes=Q.map(()=>({attempts:0,lastSelected:null,mastered:false}));
    let wrongBookOpen=false;
    let order=Q.map((_,i)=>i), cursor=0;
    const $=s=>root.querySelector(s);
    const el={total:$('#c3-total'),pos:$('#c3-pos'),done:$('#c3-done'),score:$('#c3-score'),type:$('#c3-type'),topic:$('#c3-topic'),kind:$('#c3-kind'),topicLabel:$('#c3-topic-label'),page:$('#c3-page'),progress:$('#c3-progress'),question:$('#c3-question'),code:$('#c3-code'),options:$('#c3-options'),responseWrap:$('#c3-response-wrap'),response:$('#c3-response'),summary:$('#c3-summary'),prev:$('#c3-prev'),submit:$('#c3-submit'),master:$('#c3-master'),review:$('#c3-review'),next:$('#c3-next'),shuffle:$('#c3-shuffle'),retry:$('#c3-retry'),ask:$('#c3-ask'),askBtn:$('#c3-ask-btn'),feedback:$('#c3-feedback'),wrongCount:$('#c3-wrong-count'),wrongBookButton:$('#c3-wrong-book'),wrongList:$('#c3-wrong-list'),clearButton:$('#c3-clear'),savedNote:$('#c3-saved-note')};
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
    el.askBtn.addEventListener('click',async()=>{const text=el.ask.value.trim();if(!text){el.feedback.textContent='请先输入问题。';return;}const q=Q[current()];if(!window.openai||typeof window.openai.sendFollowUpMessage!=='function'){el.feedback.textContent='当前环境不支持直接追问，可在对话框中发送该问题。';return;}el.askBtn.disabled=true;el.feedback.textContent='正在准备追问…';try{await window.openai.sendFollowUpMessage({title:'追问第三章题目',prompt:`请基于《第3章 8051指令系统与编程基础》课件回答。当前题目：${q.q}\n课件依据：第${q.page}页。\n我的追问：${text}\n请重点说明寄存器、引脚或硬件工作过程，并指出考试易错点。`});el.ask.value='';el.feedback.textContent='追问已发送。';}catch(e){el.feedback.textContent='发送失败，请稍后重试。';}finally{el.askBtn.disabled=false;}});
    el.ask.addEventListener('keydown',e=>{if(e.key==='Enter')el.askBtn.click();});
    loadProgress();render();
  })();
  