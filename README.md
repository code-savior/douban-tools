# douban-tools

豆瓣租房小组体验太差:roll_eyes:

主要是中介发布了太多的虚假租房信息

让那些真实的，友邻发布的租房信息都被淹没了

浪费时间、消耗心神:expressionless:

于是，就有了写一个过滤中介小脚本的想法

经过一番折腾，外加账号被停用了半日:zipper_mouth_face:

终于初见端倪

欢迎使用:upside_down_face:



# 操作步骤如下

1. 打开豆瓣租房小组主页（地址栏中，group后面的一串数字或字母，即为该小组的id）

2. 按下键盘F12按键，打开开发者工具

3. 复制<code>get-out-fake.js</code>文件中的小脚本，将小脚本第一行<code>groupid = '648540'</code>后面的小组id替换为步骤1中的小组id。

    小脚本第二行<code>page = 5</code>为需要过滤的页数，默认为5页，可根据需求进行调整。过滤一页所需时间为30秒左右。
  
4. 在开发者工具console Tab页中粘贴修改后的小脚本，按下回车键执行

5. 等待console窗口打出<code>Filter done!!!</code>字样后，左侧表格中即替换为过滤中介后的信息

https://user-images.githubusercontent.com/88306149/127947615-a82e29bc-82a3-46a6-bd2d-6343025ffaa5.mp4


# 注意

  1. 小脚本目前仅支持PC端
  
  2. 小脚本中已经添加了防机器人check的逻辑，不要随意修改脚本中参数，否则会有账号被停用的风险:no_mouth:
  
  3. 保险起见，推荐小号使用
  
  
# 声明

  1. 如错误的使用导致账号被停用，本小脚本不承担任何law责任:scream:
  
  
# PS

  1. 如douban防机器人check进化，小脚本可能会失效，账号被停用风险会变大。经验证，一般停用半日左右，会自动恢复:zany_face:
  
