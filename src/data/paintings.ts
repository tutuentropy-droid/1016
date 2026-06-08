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

export type RelationType = "teacher_student" | "friend" | "rival" | "influenced" | "contemporary" | "same_movement";

export interface ArtistRelation {
  source: string;
  target: string;
  type: RelationType;
  description: string;
}

export interface ArtistInfo {
  name: string;
  era: string;
  region: string;
  movement: string;
  birthYear?: number;
  deathYear?: number;
  country?: string;
}

export interface StyleDimension {
  color: string;
  brushstroke: string;
  composition: string;
  theme: string;
  emotion: string;
}

export interface ArtistPeriod {
  id: string;
  artistName: string;
  periodName: string;
  periodNameEn: string;
  yearRange: string;
  startYear: number;
  endYear: number;
  description: string;
  style: StyleDimension;
  order: number;
}

export interface Painting {
  id: string;
  title: string;
  titleEn: string;
  artist: string;
  year: string;
  movement: string;
  region: string;
  country: string;
  decade: number;
  imageUrl: string;
  description: string;
  difficulty: Difficulty;
  clues: Clue[];
  zoomRegions?: ZoomRegion[];
  periodId?: string;
}

export const artistInfos: ArtistInfo[] = [
  { name: "文森特·梵高", era: "1853-1890", region: "荷兰/法国", movement: "后印象派", birthYear: 1853, deathYear: 1890, country: "荷兰" },
  { name: "列奥纳多·达·芬奇", era: "1452-1519", region: "意大利", movement: "文艺复兴盛期", birthYear: 1452, deathYear: 1519, country: "意大利" },
  { name: "克劳德·莫奈", era: "1840-1926", region: "法国", movement: "印象派", birthYear: 1840, deathYear: 1926, country: "法国" },
  { name: "巴勃罗·毕加索", era: "1881-1973", region: "西班牙/法国", movement: "立体主义", birthYear: 1881, deathYear: 1973, country: "西班牙" },
  { name: "约翰内斯·维米尔", era: "1632-1675", region: "荷兰", movement: "荷兰黄金时代", birthYear: 1632, deathYear: 1675, country: "荷兰" },
  { name: "萨尔瓦多·达利", era: "1904-1989", region: "西班牙", movement: "超现实主义", birthYear: 1904, deathYear: 1989, country: "西班牙" },
  { name: "古斯塔夫·克里姆特", era: "1862-1918", region: "奥地利", movement: "维也纳分离派", birthYear: 1862, deathYear: 1918, country: "奥地利" },
  { name: "米开朗基罗", era: "1475-1564", region: "意大利", movement: "文艺复兴盛期", birthYear: 1475, deathYear: 1564, country: "意大利" },
  { name: "爱德华·蒙克", era: "1863-1944", region: "挪威", movement: "表现主义", birthYear: 1863, deathYear: 1944, country: "挪威" },
  { name: "伦勃朗", era: "1606-1669", region: "荷兰", movement: "荷兰黄金时代", birthYear: 1606, deathYear: 1669, country: "荷兰" },
  { name: "保罗·塞尚", era: "1839-1906", region: "法国", movement: "后印象派", birthYear: 1839, deathYear: 1906, country: "法国" },
  { name: "亨利·马蒂斯", era: "1869-1954", region: "法国", movement: "野兽派", birthYear: 1869, deathYear: 1954, country: "法国" },
  { name: "皮埃尔·奥古斯特·雷诺阿", era: "1841-1919", region: "法国", movement: "印象派", birthYear: 1841, deathYear: 1919, country: "法国" },
  { name: "威廉·透纳", era: "1775-1851", region: "英国", movement: "浪漫主义", birthYear: 1775, deathYear: 1851, country: "英国" },
  { name: "迭戈·委拉斯开兹", era: "1599-1660", region: "西班牙", movement: "巴洛克", birthYear: 1599, deathYear: 1660, country: "西班牙" },
];

export const artistRelations: ArtistRelation[] = [
  { source: "文森特·梵高", target: "保罗·塞尚", type: "influenced", description: "梵高深受塞尚色彩理论的影响，塞尚被誉为\"后印象派之父\"" },
  { source: "文森特·梵高", target: "克劳德·莫奈", type: "same_movement", description: "同属印象派/后印象派脉络，梵高学习莫奈的色彩运用" },
  { source: "文森特·梵高", target: "爱德华·蒙克", type: "influenced", description: "梵高的表现性笔触深刻影响了蒙克的表现主义探索" },
  { source: "克劳德·莫奈", target: "皮埃尔·奥古斯特·雷诺阿", type: "friend", description: "印象派的核心奠基人，曾一起在户外写生作画多年" },
  { source: "克劳德·莫奈", target: "保罗·塞尚", type: "contemporary", description: "印象派展览的重要参与者，共同推动现代艺术革命" },
  { source: "皮埃尔·奥古斯特·雷诺阿", target: "保罗·塞尚", type: "contemporary", description: "印象派的代表人物，共同参展首届印象派画展" },
  { source: "保罗·塞尚", target: "巴勃罗·毕加索", type: "influenced", description: "毕加索曾说\"塞尚是我们所有人的父亲\"，直接启发了立体主义" },
  { source: "保罗·塞尚", target: "亨利·马蒂斯", type: "influenced", description: "塞尚的形式探索对马蒂斯的野兽派有重要启发" },
  { source: "巴勃罗·毕加索", target: "亨利·马蒂斯", type: "rival", description: "20世纪初两位最伟大的艺术家，亦敌亦友，相互竞争又彼此欣赏" },
  { source: "巴勃罗·毕加索", target: "萨尔瓦多·达利", type: "influenced", description: "达利年轻时崇拜毕加索，立体主义是超现实主义的重要源头" },
  { source: "爱德华·蒙克", target: "古斯塔夫·克里姆特", type: "contemporary", description: "19世纪末欧洲表现主义/象征主义的代表人物" },
  { source: "爱德华·蒙克", target: "萨尔瓦多·达利", type: "influenced", description: "蒙克的心理表现为超现实主义探索潜意识开辟了道路" },
  { source: "列奥纳多·达·芬奇", target: "米开朗基罗", type: "rival", description: "文艺复兴三杰中的两位，佛罗伦萨的竞争对手，个性迥异" },
  { source: "约翰内斯·维米尔", target: "伦勃朗", type: "contemporary", description: "荷兰黄金时代的两位代表画家，伦勃朗是当时最受尊敬的前辈" },
  { source: "迭戈·委拉斯开兹", target: "伦勃朗", type: "contemporary", description: "17世纪巴洛克时代的两位光影大师，分别代表西班牙与荷兰画派" },
  { source: "威廉·透纳", target: "克劳德·莫奈", type: "influenced", description: "透纳的光线与氛围探索为印象派奠定了基础" },
  { source: "亨利·马蒂斯", target: "古斯塔夫·克里姆特", type: "contemporary", description: "20世纪初装饰性与色彩解放的重要探索者" },
];

export const allCountries = Array.from(new Set(artistInfos.map(a => a.country).filter(Boolean))) as string[];

export const artistPeriods: ArtistPeriod[] = [
  {
    id: "picasso-blue",
    artistName: "巴勃罗·毕加索",
    periodName: "蓝色时期",
    periodNameEn: "Blue Period",
    yearRange: "1901-1904",
    startYear: 1901,
    endYear: 1904,
    description: "受好友卡萨吉马斯自杀影响，毕加索以忧郁的蓝色调描绘贫困、孤独与苦难。",
    style: {
      color: "以深蓝、蓝绿等冷色调为主，单色倾向强烈，色彩压抑深沉",
      brushstroke: "笔触较为克制内敛，线条流畅但带有沉重感",
      composition: "构图简洁，人物形象拉长瘦削，常以剪影式轮廓呈现",
      theme: "乞丐、流浪汉、盲人、母亲与孩子等社会边缘人物",
      emotion: "忧郁、孤独、绝望、悲悯，充满存在主义式的悲凉",
    },
    order: 1,
  },
  {
    id: "picasso-rose",
    artistName: "巴勃罗·毕加索",
    periodName: "玫瑰时期",
    periodNameEn: "Rose Period",
    yearRange: "1904-1906",
    startYear: 1904,
    endYear: 1906,
    description: "与恋人费尔南德·奥利维耶相遇后，色调转为温暖的粉红与橘红，主题也更为轻松。",
    style: {
      color: "玫瑰红、橘红、粉色等暖色调为主，色彩明亮温暖",
      brushstroke: "笔触更为柔和轻盈，造型趋于圆润饱满",
      composition: "人物造型更为丰满，场景多带有马戏团与戏剧元素",
      theme: "马戏团演员、杂技艺人、小丑、恋人等充满生活气息的主题",
      emotion: "温柔、浪漫、怀旧，带有一丝苦涩的诗意",
    },
    order: 2,
  },
  {
    id: "picasso-african",
    artistName: "巴勃罗·毕加索",
    periodName: "非洲时期",
    periodNameEn: "African Period",
    yearRange: "1906-1909",
    startYear: 1906,
    endYear: 1909,
    description: "受非洲面具和伊比利亚雕塑启发，开始探索几何化与简化形式，为立体主义奠基。",
    style: {
      color: "色调趋于土红、赭石、棕色等原始质朴的大地色系",
      brushstroke: "笔触粗犷有力，轮廓线变得硬朗明确",
      composition: "人物面部几何化、面具化，身体造型简化为块面结构",
      theme: "女性裸体、原始仪式感的人物形象",
      emotion: "神秘、原始、野性，充满对异质文化的敬畏与探索欲",
    },
    order: 3,
  },
  {
    id: "picasso-cubism",
    artistName: "巴勃罗·毕加索",
    periodName: "立体主义时期",
    periodNameEn: "Cubism Period",
    yearRange: "1909-1919",
    startYear: 1909,
    endYear: 1919,
    description: "与布拉克共同创立立体主义，将物体分解为多个几何视角同时呈现，彻底颠覆传统透视。",
    style: {
      color: "分析立体主义以棕、灰、赭等中性色为主；综合立体主义则引入拼贴与更多色彩",
      brushstroke: "笔触消失于几何块面之中，以清晰的直线与弧线分割画面",
      composition: "多视角同时呈现，物体被解构为几何碎片后重新组合",
      theme: "静物、乐器、人物肖像、战争场景（如格尔尼卡）",
      emotion: "理性解构、智性探索，后期则带有强烈的政治与情感表达",
    },
    order: 4,
  },
  {
    id: "picasso-late",
    artistName: "巴勃罗·毕加索",
    periodName: "晚期多变时期",
    periodNameEn: "Late Period",
    yearRange: "1920-1973",
    startYear: 1920,
    endYear: 1973,
    description: "风格更加自由多变，融合新古典主义、超现实主义等元素，晚年创作精力依然旺盛。",
    style: {
      color: "色彩极为丰富大胆，有时强烈对比，有时和谐统一",
      brushstroke: "笔触极为自由，从精细到粗犷随心所欲",
      composition: "不断尝试新的构图与变形，常向艺术大师致敬",
      theme: "斗牛、画家与模特、变形肖像、神话场景",
      emotion: "生命的狂欢、爱情的炽热、对死亡的思考，充满原始生命力",
    },
    order: 5,
  },
  {
    id: "vangogh-dutch",
    artistName: "文森特·梵高",
    periodName: "荷兰时期",
    periodNameEn: "Dutch Period",
    yearRange: "1881-1885",
    startYear: 1881,
    endYear: 1885,
    description: "早期在荷兰的创作，深受米勒等现实主义画家影响，色调阴暗，关注农民生活。",
    style: {
      color: "以褐色、暗绿、深灰等暗色调为主，色彩厚重沉闷",
      brushstroke: "笔触粗犷厚重，常用厚涂技法堆积颜料",
      composition: "人物造型朴实笨拙，场景多为农舍、田野、工人",
      theme: "农民、织工、乡村生活、静物如《吃土豆的人》",
      emotion: "沉重、悲悯、对劳苦大众的深切同情",
    },
    order: 1,
  },
  {
    id: "vangogh-paris",
    artistName: "文森特·梵高",
    periodName: "巴黎时期",
    periodNameEn: "Paris Period",
    yearRange: "1886-1888",
    startYear: 1886,
    endYear: 1888,
    description: "在巴黎接触印象派与新印象派后，色彩骤然明亮，笔触也变得更为自由。",
    style: {
      color: "色彩开始明亮丰富，受点彩派影响使用小笔触并置",
      brushstroke: "从厚重转向轻快，笔触短小灵动，带有抖动感",
      composition: "开始关注光与色的变化，场景多为巴黎街景、花卉、自画像",
      theme: "花卉静物、自画像、塞纳河畔、蒙马特风景",
      emotion: "从抑郁中暂时复苏，充满对新艺术的兴奋与探索热情",
    },
    order: 2,
  },
  {
    id: "vangogh-arles",
    artistName: "文森特·梵高",
    periodName: "阿尔勒时期",
    periodNameEn: "Arles Period",
    yearRange: "1888-1889",
    startYear: 1888,
    endYear: 1889,
    description: "法国南部阿尔勒的阳光点燃了梵高最辉煌的创作期，黄色调和旋涡笔触成为标志。",
    style: {
      color: "强烈的黄色、橙色、蓝色互补对比，色彩饱和度达到极致",
      brushstroke: "标志性的旋涡状、波浪状厚涂笔触，充满动势与能量",
      composition: "画面充满动感，物体轮廓扭曲变形以表达情感",
      theme: "向日葵、麦田、咖啡馆、黄房子、星空、花园",
      emotion: "狂热、喜悦、对生命的极致热爱，夹杂精神危机前的躁动",
    },
    order: 3,
  },
  {
    id: "vangogh-saintremy",
    artistName: "文森特·梵高",
    periodName: "圣雷米时期",
    periodNameEn: "Saint-Rémy Period",
    yearRange: "1889-1890",
    startYear: 1889,
    endYear: 1890,
    description: "在圣雷米精神病院期间的创作，《星月夜》即诞生于此，笔触更加奔放扭曲。",
    style: {
      color: "蓝紫色调与金黄色交织，色彩对比强烈而神秘",
      brushstroke: "旋涡状笔触达到巅峰，整个画面处于流动的能量场中",
      composition: "柏树、星空、麦田等被极端扭曲变形，空间感被消解",
      theme: "星月夜、柏树、麦田群鸦、医院花园、自画像",
      emotion: "精神挣扎与艺术升华并存，在痛苦中达到创造力的顶峰",
    },
    order: 4,
  },
  {
    id: "monet-early",
    artistName: "克劳德·莫奈",
    periodName: "早期印象派时期",
    periodNameEn: "Early Impressionism",
    yearRange: "1860-1880",
    startYear: 1860,
    endYear: 1880,
    description: "印象派的奠基时期，《日出·印象》即诞生于此，开创户外写生与捕捉瞬间光影的新范式。",
    style: {
      color: "色彩明亮鲜活，打破传统暗色调，注重光色的瞬间变化",
      brushstroke: "快速松散的笔触，细碎短促，不求精细轮廓",
      composition: "构图随意自然，常取不对称布局，捕捉日常生活片段",
      theme: "塞纳河畔、日出日落、海滨风景、庭院人物、城市街景",
      emotion: "轻松愉悦，充满对自然光影的迷恋与革新的热情",
    },
    order: 1,
  },
  {
    id: "monet-mature",
    artistName: "克劳德·莫奈",
    periodName: "成熟期印象派",
    periodNameEn: "Mature Impressionism",
    yearRange: "1880-1900",
    startYear: 1880,
    endYear: 1900,
    description: "在吉维尼花园定居后，开始系统探索同一场景在不同光线下的系列画作（干草堆、大教堂）。",
    style: {
      color: "色彩更加丰富微妙，系列画作中同一主题呈现出截然不同的色调",
      brushstroke: "笔触更加融合，色彩层叠丰富，注重整体氛围的营造",
      composition: "构图趋于稳定和谐，开始追求画面的装饰性与平面感",
      theme: "干草堆系列、鲁昂大教堂系列、睡莲初期、吉维尼花园",
      emotion: "宁静沉思，对时间流逝与光影变幻的哲理性感悟",
    },
    order: 2,
  },
  {
    id: "monet-late",
    artistName: "克劳德·莫奈",
    periodName: "晚年睡莲时期",
    periodNameEn: "Late Water Lilies",
    yearRange: "1900-1926",
    startYear: 1900,
    endYear: 1926,
    description: "晚年因白内障视力衰退，创作更加抽象自由，大型睡莲壁画成为对光影的终极探索。",
    style: {
      color: "色彩趋于抽象，蓝、绿、粉、紫等色调相互交融，几乎没有明确界限",
      brushstroke: "笔触极为自由奔放，画面趋于抽象表现，几乎消解了具象形体",
      composition: "没有地平线与空间透视，水面倒影与真实景物融为一体，形成无限延伸的空间",
      theme: "睡莲池系列、日本桥、花园水景、大型装饰壁画",
      emotion: "超然物外的宁静，对自然与生命本质的冥想，接近东方禅宗的意境",
    },
    order: 3,
  },
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
    country: "荷兰",
    decade: 1880,
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
    periodId: "vangogh-saintremy",
  },
  {
    id: "2",
    title: "蒙娜丽莎",
    titleEn: "Mona Lisa",
    artist: "列奥纳多·达·芬奇",
    year: "1503-1519",
    movement: "文艺复兴盛期",
    region: "意大利/法国",
    country: "意大利",
    decade: 1500,
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
    country: "法国",
    decade: 1870,
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
    periodId: "monet-early",
  },
  {
    id: "4",
    title: "格尔尼卡",
    titleEn: "Guernica",
    artist: "巴勃罗·毕加索",
    year: "1937",
    movement: "立体主义",
    region: "西班牙/法国",
    country: "西班牙",
    decade: 1930,
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
    periodId: "picasso-late",
  },
  {
    id: "5",
    title: "戴珍珠耳环的少女",
    titleEn: "Girl with a Pearl Earring",
    artist: "约翰内斯·维米尔",
    year: "约1665",
    movement: "荷兰黄金时代",
    region: "荷兰",
    country: "荷兰",
    decade: 1660,
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
    country: "西班牙",
    decade: 1930,
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
    country: "奥地利",
    decade: 1900,
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
    country: "意大利",
    decade: 1510,
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
    country: "挪威",
    decade: 1890,
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
    country: "荷兰",
    decade: 1640,
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
    country: "法国",
    decade: 1900,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Claude_Monet_-_Water_Lilies_-_1906%2C_66.jpg/1280px-Claude_Monet_-_Water_Lilies_-_1906%2C_66.jpg",
    description: "莫奈在吉维尼花园的睡莲池边创作的系列作品之一，晚年近乎失明状态下仍坚持创作，成为印象派最具标志性的系列。",
    difficulty: "hard",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 20 世纪初（1906年）" },
      { type: "basic", label: "创作地区", content: "法国吉维尼小镇，画家在此建造了自己的花园" },
      { type: "style", label: "画风特点", content: "几乎没有明确的轮廓线，水面倒影与真实景物融为一体，色彩丰富而微妙" },
      { type: "key", label: "关键线索", content: "是印象派创始人晚年的系列作品；画了250多幅同主题；晚年白内障近乎失明仍作画" },
    ],
    periodId: "monet-mature",
  },
  {
    id: "12",
    title: "向日葵",
    titleEn: "Sunflowers",
    artist: "文森特·梵高",
    year: "1888",
    movement: "后印象派",
    region: "荷兰/法国",
    country: "荷兰",
    decade: 1880,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg/800px-Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
    description: "梵高在阿尔勒时期为好友高更的房间创作，以浓烈的黄色调表达热情与生命力，是他最受人喜爱的系列作品。",
    difficulty: "easy",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 19 世纪 80 年代末（1888年）" },
      { type: "basic", label: "创作地区", content: "法国南部阿尔勒小镇的黄房子里" },
      { type: "style", label: "画风特点", content: "强烈的黄色调为主，厚涂的笔触表现花瓣质感，充满生命力" },
      { type: "key", label: "关键线索", content: "为迎接好友高更来访而装饰房间的系列画；共画了多幅向日葵；画家一生只卖出过一幅画" },
    ],
    periodId: "vangogh-arles",
  },
  {
    id: "13",
    title: "吃土豆的人",
    titleEn: "The Potato Eaters",
    artist: "文森特·梵高",
    year: "1885",
    movement: "现实主义",
    region: "荷兰",
    country: "荷兰",
    decade: 1880,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Van_Gogh_-_The_Potato_Eaters_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_The_Potato_Eaters_-_Google_Art_Project.jpg",
    description: "梵高荷兰时期的代表作，描绘农民家庭围坐桌前吃土豆的场景，色调阴暗沉重，体现对劳苦大众的深切同情。",
    difficulty: "hard",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 19 世纪 80 年代中期（1885年）" },
      { type: "basic", label: "创作地区", content: "画家在荷兰纽南的乡村创作" },
      { type: "style", label: "画风特点", content: "以褐色、暗绿等暗色调为主，笔触厚重粗犷，人物造型朴实笨拙" },
      { type: "key", label: "关键线索", content: "画家早期深受米勒现实主义影响；此画主题是农民生活；色调阴暗与后期明亮风格形成鲜明对比" },
    ],
    periodId: "vangogh-dutch",
  },
  {
    id: "14",
    title: "自画像（巴黎时期）",
    titleEn: "Self-Portrait (Paris)",
    artist: "文森特·梵高",
    year: "1887",
    movement: "后印象派",
    region: "法国",
    country: "荷兰",
    decade: 1880,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
    description: "梵高在巴黎时期的自画像，色彩开始变得明亮，使用点彩派的小笔触，显示出受印象派影响的转变。",
    difficulty: "normal",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 19 世纪 80 年代末（1887年）" },
      { type: "basic", label: "创作地区", content: "画家在法国巴黎居住期间" },
      { type: "style", label: "画风特点", content: "色彩明亮丰富，使用小笔触并置，受新印象派点彩技法影响" },
      { type: "key", label: "关键线索", content: "画家在此时期结识了高更、毕沙罗等印象派画家；画风从阴暗转向明亮的关键过渡期" },
    ],
    periodId: "vangogh-paris",
  },
  {
    id: "15",
    title: "亚维农少女",
    titleEn: "Les Demoiselles d'Avignon",
    artist: "巴勃罗·毕加索",
    year: "1907",
    movement: "立体主义",
    region: "西班牙/法国",
    country: "西班牙",
    decade: 1900,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Les_Demoiselles_d%27Avignon.jpg/1280px-Les_Demoiselles_d%27Avignon.jpg",
    description: "立体主义的开山之作，受非洲面具启发将人物面孔几何化、面具化，彻底颠覆传统绘画的透视法则。",
    difficulty: "hard",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 20 世纪初（1907年）" },
      { type: "basic", label: "创作地区", content: "画家在巴黎的工作室中创作" },
      { type: "style", label: "画风特点", content: "人物面部几何化、面具化，身体简化为块面结构，多视角同时呈现" },
      { type: "key", label: "关键线索", content: "此画被视为立体主义的开山之作；受非洲面具和伊比利亚雕塑启发；当时备受争议" },
    ],
    periodId: "picasso-african",
  },
  {
    id: "16",
    title: "弹吉他的老人",
    titleEn: "The Old Guitarist",
    artist: "巴勃罗·毕加索",
    year: "1903",
    movement: "后印象派",
    region: "西班牙/法国",
    country: "西班牙",
    decade: 1900,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Picasso_old_guitarist_1903.jpg/800px-Picasso_old_guitarist_1903.jpg",
    description: "毕加索蓝色时期的代表作，以单一的蓝色调描绘一位瘦弱的盲人吉他手，充满忧郁与悲悯。",
    difficulty: "normal",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 20 世纪初（1903年）" },
      { type: "basic", label: "创作地区", content: "画家在西班牙巴塞罗那和法国巴黎之间辗转" },
      { type: "style", label: "画风特点", content: "以深蓝、蓝绿等冷色调为主，单色倾向强烈，人物形象拉长瘦削" },
      { type: "key", label: "关键线索", content: "画家好友卡萨吉马斯自杀后陷入抑郁；这一时期全部使用蓝色调；主题多为社会边缘人物" },
    ],
    periodId: "picasso-blue",
  },
  {
    id: "17",
    title: "拿烟斗的男孩",
    titleEn: "Boy with a Pipe",
    artist: "巴勃罗·毕加索",
    year: "1905",
    movement: "后印象派",
    region: "法国",
    country: "西班牙",
    decade: 1900,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Picasso_garcon_a_la_pipe.jpg/800px-Picasso_garcon_a_la_pipe.jpg",
    description: "毕加索玫瑰时期的代表作，以温暖的粉红色调描绘一位手持烟斗的少年，曾创下当时拍卖最高纪录。",
    difficulty: "normal",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 20 世纪初（1905年）" },
      { type: "basic", label: "创作地区", content: "画家在法国巴黎蒙马特高地居住" },
      { type: "style", label: "画风特点", content: "玫瑰红、橘红等暖色调为主，人物造型圆润饱满，笔触柔和轻盈" },
      { type: "key", label: "关键线索", content: "画家与恋人费尔南德相遇后心情好转；主题常涉及马戏团演员；此画曾拍出1.04亿美元天价" },
    ],
    periodId: "picasso-rose",
  },
  {
    id: "18",
    title: "静物与藤椅",
    titleEn: "Still Life with Chair Caning",
    artist: "巴勃罗·毕加索",
    year: "1912",
    movement: "立体主义",
    region: "法国",
    country: "西班牙",
    decade: 1910,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Still_Life_with_Chair_Caning.jpg/800px-Still_Life_with_Chair_Caning.jpg",
    description: "综合立体主义的代表作，首次在绘画中使用拼贴技法，将真实的藤椅图案油布贴在画布上。",
    difficulty: "hard",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 20 世纪 10 年代（1912年）" },
      { type: "basic", label: "创作地区", content: "画家在法国巴黎与布拉克共同探索立体主义" },
      { type: "style", label: "画风特点", content: "以棕、灰、赭等中性色为主，几何块面分割画面，首次使用拼贴技法" },
      { type: "key", label: "关键线索", content: "此画首次引入拼贴技术；综合立体主义的开端；用真实物质挑战绘画的传统定义" },
    ],
    periodId: "picasso-cubism",
  },
  {
    id: "19",
    title: "鲁昂大教堂（黄昏）",
    titleEn: "Rouen Cathedral (Sunset)",
    artist: "克劳德·莫奈",
    year: "1894",
    movement: "印象派",
    region: "法国",
    country: "法国",
    decade: 1890,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Claude_Monet_-_Rouen_Cathedral_Facade_%28Sunset%29_-_Google_Art_Project.jpg/800px-Claude_Monet_-_Rouen_Cathedral_Facade_%28Sunset%29_-_Google_Art_Project.jpg",
    description: "莫奈鲁昂大教堂系列之一，描绘黄昏时分光线照在教堂立面上的微妙变化，色彩层叠丰富。",
    difficulty: "normal",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 19 世纪 90 年代（1894年）" },
      { type: "basic", label: "创作地区", content: "画家在法国诺曼底地区的鲁昂市" },
      { type: "style", label: "画风特点", content: "笔触更加融合，色彩层叠丰富，注重整体氛围营造，构图稳定和谐" },
      { type: "key", label: "关键线索", content: "同一场景画了30多幅不同光线版本；系列画作是莫奈成熟期的标志；对时间与光影的哲理性探索" },
    ],
    periodId: "monet-mature",
  },
  {
    id: "20",
    title: "睡莲（大型壁画）",
    titleEn: "Water Lilies (Grandes Décorations)",
    artist: "克劳德·莫奈",
    year: "1916-1926",
    movement: "印象派",
    region: "法国",
    country: "法国",
    decade: 1910,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Claude_Monet_-_Water_Lilies_-_1916-1926.jpg/1280px-Claude_Monet_-_Water_Lilies_-_1916-1926.jpg",
    description: "莫奈晚年为巴黎橘园美术馆创作的大型睡莲壁画，没有地平线，画面趋于抽象，是对光影的终极探索。",
    difficulty: "hard",
    clues: [
      { type: "basic", label: "年代范围", content: "创作于 20 世纪初至中期（1916-1926年）" },
      { type: "basic", label: "创作地区", content: "画家在法国吉维尼花园的睡莲池边" },
      { type: "style", label: "画风特点", content: "没有地平线与空间透视，色彩趋于抽象，笔触极为自由奔放" },
      { type: "key", label: "关键线索", content: "画家晚年因白内障视力衰退；画作尺寸巨大如壁画；被视为抽象表现主义的先驱" },
    ],
    periodId: "monet-late",
  },
];

export const allArtists = Array.from(new Set(paintings.map(p => p.artist)));
export const allMovements = Array.from(new Set(paintings.map(p => p.movement)));
export const artistsWithPeriods = Array.from(new Set(artistPeriods.map(p => p.artistName)));
export function getPeriodsByArtist(artistName: string): ArtistPeriod[] {
  return artistPeriods
    .filter((p) => p.artistName === artistName)
    .sort((a, b) => a.order - b.order);
}
export function getPaintingsByArtist(artistName: string): Painting[] {
  return paintings.filter((p) => p.artist === artistName);
}
export function getPeriodById(periodId: string): ArtistPeriod | undefined {
  return artistPeriods.find((p) => p.id === periodId);
}
