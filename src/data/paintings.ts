export type Difficulty = "easy" | "normal" | "hard";

export interface Clue {
  type: "basic" | "style" | "key";
  label: string;
  content: string;
}

export interface ZoomRegion {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

export interface ArtistInfo {
  name: string;
  era: string;
  region: string;
  movement: string;
}

export interface Painting {
  id: string;
  title: string;
  titleEn: string;
  artist: string;
  year: string;
  movement: string;
  region: string;
  imageUrl: string;
  description: string;
  difficulty: Difficulty;
  clues: Clue[];
  zoomRegions?: ZoomRegion[];
}

export const artistInfos: ArtistInfo[] = [
  { name: "文森特·梵高", era: "1853-1890", region: "荷兰/法国", movement: "后印象派" },
  { name: "列奥纳多·达·芬奇", era: "1452-1519", region: "意大利", movement: "文艺复兴盛期" },
  { name: "克劳德·莫奈", era: "1840-1926", region: "法国", movement: "印象派" },
  { name: "巴勃罗·毕加索", era: "1881-1973", region: "西班牙/法国", movement: "立体主义" },
  { name: "约翰内斯·维米尔", era: "1632-1675", region: "荷兰", movement: "荷兰黄金时代" },
  { name: "萨尔瓦多·达利", era: "1904-1989", region: "西班牙", movement: "超现实主义" },
  { name: "古斯塔夫·克里姆特", era: "1862-1918", region: "奥地利", movement: "维也纳分离派" },
  { name: "米开朗基罗", era: "1475-1564", region: "意大利", movement: "文艺复兴盛期" },
  { name: "爱德华·蒙克", era: "1863-1944", region: "挪威", movement: "表现主义" },
  { name: "伦勃朗", era: "1606-1669", region: "荷兰", movement: "荷兰黄金时代" },
  { name: "保罗·塞尚", era: "1839-1906", region: "法国", movement: "后印象派" },
  { name: "亨利·马蒂斯", era: "1869-1954", region: "法国", movement: "野兽派" },
  { name: "皮埃尔·奥古斯特·雷诺阿", era: "1841-1919", region: "法国", movement: "印象派" },
  { name: "威廉·透纳", era: "1775-1851", region: "英国", movement: "浪漫主义" },
  { name: "迭戈·委拉斯开兹", era: "1599-1660", region: "西班牙", movement: "巴洛克" },
];

export const paintings: Painting[] = [
  {
    id: "1",
    title: "星月夜",
    titleEn: "The Starry Night",
    artist: "文森特·梵高",
    year: "1889",
    movement: "后印象派",
    region: "荷兰/法国",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    description: "梵高在法国圣雷米精神病院期间创作，以旋涡状的笔触描绘夜空中闪烁的星辰与明月，被认为是西方艺术史上最知名的画作之一。",
    difficulty: "easy",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 19 世纪 80 年代末" },
      { type: "basic", label: "创作地区", content: "画家在法国南部的精神病院中完成此作" },
      { type: "style", label: "画风特点", content: "强烈的旋涡状笔触，浓厚的油彩堆塑，夜空被描绘成流动的能量场" },
      { type: "key", label: "关键线索", content: "画家曾割下自己的耳朵，与高更是好友，37岁时自杀离世" },
    ],
    zoomRegions: [
      { x: 60, y: 10, w: 30, h: 25, label: "旋涡状星云" },
      { x: 5, y: 70, w: 25, h: 25, label: "柏树剪影" },
    ],
  },
  {
    id: "2",
    title: "蒙娜丽莎",
    titleEn: "Mona Lisa",
    artist: "列奥纳多·达·芬奇",
    year: "1503-1519",
    movement: "文艺复兴盛期",
    region: "意大利/法国",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    description: "以神秘的微笑和精湛的晕涂法闻名于世，是卢浮宫最珍贵的馆藏，描绘了佛罗伦萨商人之妻丽莎·盖拉尔迪尼的肖像。",
    difficulty: "easy",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 16 世纪初，文艺复兴的巅峰时期" },
      { type: "basic", label: "创作地区", content: "画家是意大利佛罗伦萨人，晚年移居法国" },
      { type: "style", label: "画风特点", content: "运用晕涂法（Sfumato），嘴角和眼角的阴影若隐若现，营造神秘微笑" },
      { type: "key", label: "关键线索", content: "画家不仅是画家，还是科学家、发明家、工程师，留下了数千页手稿" },
    ],
    zoomRegions: [
      { x: 35, y: 25, w: 30, h: 20, label: "神秘的微笑" },
    ],
  },
  {
    id: "3",
    title: "日出·印象",
    titleEn: "Impression, Sunrise",
    artist: "克劳德·莫奈",
    year: "1872",
    movement: "印象派",
    region: "法国",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg",
    description: "这幅画在1874年首届印象派展览上亮相，其标题被评论家借用嘲讽整个画派，从而诞生了\"印象派\"这一名称。",
    difficulty: "normal",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 19 世纪 70 年代" },
      { type: "basic", label: "创作地区", content: "描绘的是法国勒阿弗尔港的清晨景色" },
      { type: "style", label: "画风特点", content: "松散快速的笔触，捕捉转瞬即逝的光影效果，不追求精细轮廓" },
      { type: "key", label: "关键线索", content: "此画的标题被记者嘲讽借用，从而命名了整个画派；画家晚年沉迷于画花园中的睡莲" },
    ],
    zoomRegions: [
      { x: 40, y: 40, w: 20, h: 20, label: "日出的太阳" },
    ],
  },
  {
    id: "4",
    title: "格尔尼卡",
    titleEn: "Guernica",
    artist: "巴勃罗·毕加索",
    year: "1937",
    movement: "立体主义",
    region: "西班牙/法国",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/PicassoGuernica.jpg/1280px-PicassoGuernica.jpg",
    description: "毕加索为1937年巴黎世博会西班牙馆创作，以立体主义手法描绘了西班牙内战中格尔尼卡小镇被轰炸后的惨状。",
    difficulty: "normal",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 20 世纪 30 年代" },
      { type: "basic", label: "创作地区", content: "画家是西班牙人，但长期在巴黎工作生活" },
      { type: "style", label: "画风特点", content: "黑白灰单色，破碎解构的形象，多视角同时呈现的立体主义语言" },
      { type: "key", label: "关键线索", content: "此画是为抗议西班牙内战中德国纳粹轰炸格尔尼卡小镇而作；画家一生风格多变（蓝色时期、玫瑰时期、立体主义...）" },
    ],
    zoomRegions: [
      { x: 30, y: 5, w: 40, h: 30, label: "悲鸣的公牛与马" },
    ],
  },
  {
    id: "5",
    title: "戴珍珠耳环的少女",
    titleEn: "Girl with a Pearl Earring",
    artist: "约翰内斯·维米尔",
    year: "约1665",
    movement: "荷兰黄金时代",
    region: "荷兰",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
    description: "被誉为\"北方的蒙娜丽莎\"，以少女回眸的姿态和蓝色头巾与珍珠耳环的对比闻名，现藏于荷兰莫瑞泰斯皇家美术馆。",
    difficulty: "normal",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 17 世纪中叶" },
      { type: "basic", label: "创作地区", content: "荷兰代尔夫特的画家，一生几乎未离开过故乡" },
      { type: "style", label: "画风特点", content: "细腻柔和的光线处理，善于描绘室内场景和人物的静谧感，对光影极其敏感" },
      { type: "key", label: "关键线索", content: "被誉为\"北方的蒙娜丽莎\"，画家生前穷困潦倒，死后作品才被重新发现" },
    ],
    zoomRegions: [
      { x: 50, y: 55, w: 15, h: 15, label: "珍珠耳环" },
    ],
  },
  {
    id: "6",
    title: "记忆的永恒",
    titleEn: "The Persistence of Memory",
    artist: "萨尔瓦多·达利",
    year: "1931",
    movement: "超现实主义",
    region: "西班牙",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/The_Persistence_of_Memory.jpg/1024px-The_Persistence_of_Memory.jpg",
    description: "超现实主义代表作，画面中软塌塌的时钟成为标志性意象，象征着时间的主观性和梦境般的荒诞感。",
    difficulty: "normal",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 20 世纪 30 年代" },
      { type: "basic", label: "创作地区", content: "西班牙加泰罗尼亚画家，家乡的海岸风景常出现在画中" },
      { type: "style", label: "画风特点", content: "精细写实的技法描绘荒诞梦境般的场景，将潜意识视觉化" },
      { type: "key", label: "关键线索", content: "标志性的软塌塌时钟；画家以怪异的行为举止和夸张的小胡子著称，信奉偏执批判法" },
    ],
    zoomRegions: [
      { x: 55, y: 55, w: 20, h: 20, label: "融化的时钟" },
    ],
  },
  {
    id: "7",
    title: "吻",
    titleEn: "The Kiss",
    artist: "古斯塔夫·克里姆特",
    year: "1907-1908",
    movement: "新艺术运动 / 维也纳分离派",
    region: "奥地利",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1024px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    description: "克里姆特金色时期的巅峰之作，大量使用金箔装饰，描绘了相拥亲吻的恋人，是维也纳分离派最具代表性的作品。",
    difficulty: "hard",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 20 世纪初（1907-1908）" },
      { type: "basic", label: "创作地区", content: "奥匈帝国维也纳的画家" },
      { type: "style", label: "画风特点", content: "大量使用金箔装饰，平面化装饰性图案与写实人物并置，情色与高雅的张力" },
      { type: "key", label: "关键线索", content: "维也纳分离派的创始人；金色时期的巅峰之作；画作中充满象征主义的装饰图案" },
    ],
    zoomRegions: [
      { x: 45, y: 35, w: 20, h: 25, label: "相拥的恋人" },
    ],
  },
  {
    id: "8",
    title: "创造亚当",
    titleEn: "The Creation of Adam",
    artist: "米开朗基罗",
    year: "约1512",
    movement: "文艺复兴盛期",
    region: "意大利",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
    description: "梵蒂冈西斯廷教堂天顶画的一部分，描绘了《圣经·创世纪》中上帝赋予亚当生命的瞬间，两指间的留白成为艺术史上的经典。",
    difficulty: "easy",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 16 世纪初（约1512年）" },
      { type: "basic", label: "创作地区", content: "意大利文艺复兴的核心地区——佛罗伦萨和罗马" },
      { type: "style", label: "画风特点", content: "雕塑般的人体解剖精准，肌肉线条充满力量感，宏大的构图与戏剧张力" },
      { type: "key", label: "关键线索", content: "梵蒂冈西斯廷教堂天顶画；画家更认为自己是雕塑家而非画家；与达芬奇、拉斐尔并称文艺复兴三杰" },
    ],
    zoomRegions: [
      { x: 45, y: 45, w: 15, h: 15, label: "将触的手指" },
    ],
  },
  {
    id: "9",
    title: "呐喊",
    titleEn: "The Scream",
    artist: "爱德华·蒙克",
    year: "1893",
    movement: "表现主义",
    region: "挪威",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    description: "表现主义的先驱之作，描绘了一个人在血红色天空下发出发自肺腑的尖叫，传达了深刻的焦虑与存在之苦。",
    difficulty: "normal",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 19 世纪 90 年代（1893年）" },
      { type: "basic", label: "创作地区", content: "北欧斯堪的纳维亚半岛的画家" },
      { type: "style", label: "画风特点", content: "扭曲的线条、血红色的天空、强烈的情绪宣泄，以视觉形式表现内心的焦虑" },
      { type: "key", label: "关键线索", content: "表现主义的先驱；画面灵感来自画家在奥斯陆峡湾散步时感受到的一声\"尖叫穿过自然\"；多次被盗的名画" },
    ],
    zoomRegions: [
      { x: 40, y: 35, w: 20, h: 35, label: "尖叫的人物" },
    ],
  },
  {
    id: "10",
    title: "夜巡",
    titleEn: "The Night Watch",
    artist: "伦勃朗",
    year: "1642",
    movement: "荷兰黄金时代",
    region: "荷兰",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Rembrandt_van_Rijn_197.jpg/1280px-Rembrandt_van_Rijn_197.jpg",
    description: "伦勃朗最著名的群像画，描绘了阿姆斯特丹民兵队出发执行任务的场景，以戏剧性的光影处理和生动的人物动态著称。",
    difficulty: "hard",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 17 世纪中叶（1642年）" },
      { type: "basic", label: "创作地区", content: "荷兰阿姆斯特丹，当时正处于荷兰黄金时代" },
      { type: "style", label: "画风特点", content: "戏剧性的明暗对比光影（伦勃朗光），群像画中人物动态生动，不追求整齐排列" },
      { type: "key", label: "关键线索", content: "因画面暗曾被误认为是夜景画；画家晚年破产；此画的委托人对作品不满" },
    ],
    zoomRegions: [
      { x: 50, y: 25, w: 20, h: 35, label: "队长的手势" },
    ],
  },
  {
    id: "11",
    title: "睡莲",
    titleEn: "Water Lilies",
    artist: "克劳德·莫奈",
    year: "1906",
    movement: "印象派",
    region: "法国",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Claude_Monet_-_Water_Lilies_-_1906%2C_66.jpg/1280px-Claude_Monet_-_Water_Lilies_-_1906%2C_66.jpg",
    description: "莫奈在吉维尼花园的睡莲池边创作的系列作品之一，晚年近乎失明状态下仍坚持创作，成为印象派最具标志性的系列。",
    difficulty: "hard",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 20 世纪初（1906年）" },
      { type: "basic", label: "创作地区", content: "法国吉维尼小镇，画家在此建造了自己的花园" },
      { type: "style", label: "画风特点", content: "几乎没有明确的轮廓线，水面倒影与真实景物融为一体，色彩丰富而微妙" },
      { type: "key", label: "关键线索", content: "是印象派创始人晚年的系列作品；画了250多幅同主题；晚年白内障近乎失明仍作画" },
    ],
  },
  {
    id: "12",
    title: "向日葵",
    titleEn: "Sunflowers",
    artist: "文森特·梵高",
    year: "1888",
    movement: "后印象派",
    region: "荷兰/法国",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg/800px-Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
    description: "梵高在阿尔勒时期为好友高更的房间创作，以浓烈的黄色调表达热情与生命力，是他最受人喜爱的系列作品。",
    difficulty: "easy",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 19 世纪 80 年代末（1888年）" },
      { type: "basic", label: "创作地区", content: "法国南部阿尔勒小镇的黄房子里" },
      { type: "style", label: "画风特点", content: "强烈的黄色调为主，厚涂的笔触表现花瓣质感，充满生命力" },
      { type: "key", label: "关键线索", content: "为迎接好友高更来访而装饰房间的系列画；共画了多幅向日葵；画家一生只卖出过一幅画" },
    ],
  },
];

export const allArtists = Array.from(new Set(paintings.map(p => p.artist)));
