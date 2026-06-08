export type Difficulty = "easy" | "normal" | "hard";

export interface Clue {
  type: "basic" | "style" | "key";
  label: string;
  content: string;
}

export interface InvestigationClues {
  creationLocation: string;
  yearRangeHint: string;
  lifeEvent: string;
  styleChangeHint: string;
}

export interface PeriodExplanation {
  belongsReason: string;
  styleEvidence: string[];
}

export interface ConfusingPoint {
  misleadingFeature: string;
  correctClarification: string;
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
  evolutionSummary: string;
  keyChanges: string[];
  confusingPoints: ConfusingPoint[];
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
  investigationClues?: InvestigationClues;
  periodExplanation?: PeriodExplanation;
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
    evolutionSummary: "艺术生涯的起点，受个人悲剧影响形成统一的蓝色语汇",
    keyChanges: [
      "色调从早期多样转为以冷蓝色为主的单色表达",
      "人物造型从常规写实转向拉长变形，突出悲凉感",
      "主题转向社会边缘群体的苦难与孤独",
    ],
    confusingPoints: [
      {
        misleadingFeature: "蓝色调也出现在晚期作品中",
        correctClarification: "蓝色时期的蓝色是单色且压抑的，晚期的蓝色则更加多变、富有装饰性",
      },
      {
        misleadingFeature: "拉长的人物形象容易与表现主义混淆",
        correctClarification: "蓝色时期的拉长仍带有写实基础，笔触克制内敛，未达到表现主义的情感爆发程度",
      },
    ],
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
    evolutionSummary: "从忧郁转向温暖，爱情的力量改变了调色板",
    keyChanges: [
      "冷蓝色调被玫瑰红、橘红等暖色调取代",
      "人物造型从瘦削拉长转为圆润丰满",
      "主题从苦难边缘人转向马戏团等浪漫化的生活场景",
    ],
    confusingPoints: [
      {
        misleadingFeature: "暖色调与其他印象派画家相似",
        correctClarification: "玫瑰时期虽色彩明亮，但造型仍带有毕加索独特的变形感，笔触也不如印象派那样松散",
      },
      {
        misleadingFeature: "马戏团主题可能让人联想到后期表现主义",
        correctClarification: "玫瑰时期的马戏团人物带有温柔怀旧的诗意，而非后期的扭曲与愤怒表达",
      },
    ],
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
    evolutionSummary: "非洲面具打开了形式革命的大门，立体主义的前夜",
    keyChanges: [
      "人物面部被简化为几何形状，类似非洲面具的造型",
      "身体造型开始块面化，解构传统的人体比例",
      "色彩回归大地色系，以突出形式探索而非情感表达",
    ],
    confusingPoints: [
      {
        misleadingFeature: "几何化造型容易被误认为是立体主义",
        correctClarification: "非洲时期的几何化仍是整体简化，尚未达到立体主义多视角同时呈现的复杂程度",
      },
      {
        misleadingFeature: "大地色调与蓝色时期的单色倾向相似",
        correctClarification: "非洲时期的土色系服务于原始感与形式探索，蓝色时期的冷蓝色则是情感表达",
      },
    ],
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
    evolutionSummary: "彻底颠覆传统绘画，开创多视角解构的立体主义革命",
    keyChanges: [
      "打破单一透视，多视角同时描绘同一物体",
      "物体被分解为几何碎片后重新组合",
      "综合立体主义引入拼贴、报纸、油布等真实物质材料",
    ],
    confusingPoints: [
      {
        misleadingFeature: "抽象几何形式容易与抽象表现主义混淆",
        correctClarification: "立体主义始终以可辨识的现实物体为基础进行解构，而非完全脱离具象的抽象表达",
      },
      {
        misleadingFeature: "棕灰中性色与非洲时期的大地色调相似",
        correctClarification: "立体主义的中性色是为了让观者聚焦于形式结构，非洲时期的大地色则带有原始情感意味",
      },
    ],
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
    evolutionSummary: "晚年熔铸一切风格于一炉，自由表达生命的全部维度",
    keyChanges: [
      "从单一风格转向多种风格自由切换与融合",
      "重新引入具象与写实元素，但变形更加大胆自由",
      "色彩运用达到随心所欲的境界，强烈对比与和谐并置",
    ],
    confusingPoints: [
      {
        misleadingFeature: "变形肖像容易被误认为是立体主义的延续",
        correctClarification: "晚期的变形服务于情感表达与游戏心态，不再遵循立体主义的多视角解构逻辑",
      },
      {
        misleadingFeature: "大胆色彩可能让人联想到野兽派",
        correctClarification: "晚期色彩虽强烈，但与马蒂斯野兽派的和谐装饰感不同，毕加索的色彩常带有冲突与张力",
      },
    ],
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
    evolutionSummary: "艺术生涯的起点，现实主义影响下的黑暗土壤",
    keyChanges: [
      "以暗褐色调为主，尚未引入明亮色彩",
      "关注社会底层与农民生活，带有宗教般的悲悯情怀",
      "笔触厚重粗犷，但尚未形成后期标志性的旋涡状",
    ],
    confusingPoints: [
      {
        misleadingFeature: "厚涂笔触容易让人联想到后期",
        correctClarification: "荷兰时期的厚涂是沉重而粗犷的，尚未发展出后期那种流动的旋涡状能量",
      },
      {
        misleadingFeature: "对农民生活的关注与米勒等现实主义画家相似",
        correctClarification: "梵高的描绘带有更强烈的主观情感，笔触和色彩都比米勒更为厚重浓烈",
      },
    ],
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
    evolutionSummary: "印象派的光色洗礼，黑暗中点燃的第一缕色彩之光",
    keyChanges: [
      "暗褐色调被明亮色彩取代，调色板骤然变亮",
      "笔触从厚重粗犷转向短小灵动的印象派方式",
      "主题从农民生活转向巴黎都市风景与花卉静物",
    ],
    confusingPoints: [
      {
        misleadingFeature: "小笔触并置与新印象派点彩派相似",
        correctClarification: "梵高的笔触始终带有个人化的抖动感，远比修拉严谨的科学点彩更为自由感性",
      },
      {
        misleadingFeature: "明亮色彩容易被误认为是阿尔勒时期",
        correctClarification: "巴黎时期色彩虽明亮，但尚未达到阿尔勒时期那种强烈的黄蓝互补对比与极致饱和度",
      },
    ],
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
    evolutionSummary: "南方阳光点燃了创造力的巅峰，黄蓝交响与流动笔触成型",
    keyChanges: [
      "黄色与蓝色的强烈互补对比成为标志性色彩语言",
      "旋涡状、波浪状厚涂笔触成熟，充满动势与能量",
      "物体轮廓开始扭曲变形以服务于情感表达",
    ],
    confusingPoints: [
      {
        misleadingFeature: "旋涡笔触容易与圣雷米时期混淆",
        correctClarification: "阿尔勒时期的旋涡笔触更有节奏感和秩序感，圣雷米时期则更加狂暴混乱，能量感更强",
      },
      {
        misleadingFeature: "强烈色彩与高更等后印象派画家相似",
        correctClarification: "梵高的色彩比高更更为浓烈主观，且笔触的动态感是其独有的标志",
      },
    ],
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
    evolutionSummary: "痛苦中绽放的最后光华，笔触与色彩的终极狂欢",
    keyChanges: [
      "旋涡状笔触达到极致狂暴的状态，画面充满流动的能量",
      "蓝紫色调与金黄色交织，带有神秘的精神气息",
      "景物扭曲程度加剧，空间感进一步消解，趋于抽象",
    ],
    confusingPoints: [
      {
        misleadingFeature: "旋涡笔触与阿尔勒时期相似",
        correctClarification: "圣雷米时期的旋涡更加混乱狂放，能量感更强，蓝紫色调的占比也显著增加",
      },
      {
        misleadingFeature: "柏树与星空等主题与阿尔勒时期重叠",
        correctClarification: "圣雷米时期的柏树与星空扭曲程度远超阿尔勒，整体氛围更神秘、更具超现实意味",
      },
    ],
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
    evolutionSummary: "印象派革命的开端，捕捉瞬间光影的崭新画派诞生",
    keyChanges: [
      "走出画室进行户外写生，直接捕捉自然光线",
      "快速松散的细碎笔触取代传统学院派的平滑渲染",
      "打破暗色调传统，色彩明亮鲜活，注重光色瞬间变化",
    ],
    confusingPoints: [
      {
        misleadingFeature: "户外写生与其他印象派画家相似",
        correctClarification: "莫奈的笔触更为细碎灵动，对光线变化的敏感度在印象派中首屈一指",
      },
      {
        misleadingFeature: "明亮色彩与后期作品难以区分",
        correctClarification: "早期色彩虽明亮但仍以具象轮廓为主，未达到晚年那种近乎抽象的色彩交融",
      },
    ],
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
    evolutionSummary: "从瞬间捕捉到系统探索，同一场景的无限光影变体",
    keyChanges: [
      "开始以系列画方式系统探索同一场景的不同光影",
      "笔触更加融合，色彩层叠营造整体氛围",
      "构图趋于稳定，开始追求装饰性与平面感",
    ],
    confusingPoints: [
      {
        misleadingFeature: "系列画中的光影变化与早期印象派难以区分",
        correctClarification: "成熟期的系列画是系统性的科学探索，而非早期那种随机的瞬间捕捉",
      },
      {
        misleadingFeature: "融合的笔触容易被误认为是晚年",
        correctClarification: "成熟期的笔触虽融合但仍保留物体的清晰轮廓，晚年则几乎消解了具象形体",
      },
    ],
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
    evolutionSummary: "视力衰退带来的意外解放，通向抽象与纯粹视觉的终极旅程",
    keyChanges: [
      "地平线消失，空间透视被消解，画面趋于无限延伸",
      "具象形体几乎完全消融于色彩与笔触之中",
      "色彩相互交融渗透，接近东方水墨画的意境",
    ],
    confusingPoints: [
      {
        misleadingFeature: "自由奔放的笔触可能被误认为是抽象表现主义",
        correctClarification: "莫奈晚年的抽象始终源于对自然睡莲池的观察，而非脱离具象的纯粹主观表达",
      },
      {
        misleadingFeature: "朦胧效果与透纳的晚期风景画相似",
        correctClarification: "莫奈的朦胧源于光影与色彩的交融，始终保持色彩的纯净；透纳则更强调氛围与戏剧性",
      },
    ],
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
    investigationClues: {
      creationLocation: "法国圣雷米精神病院的病房窗口向外眺望的景色",
      yearRangeHint: "19世纪80年代末，画家36岁，去世前一年",
      lifeEvent: "自愿进入精神病院接受治疗，期间经历严重的精神崩溃但仍坚持创作",
      styleChangeHint: "阿尔勒时期的旋涡笔触进一步狂暴化，蓝紫色调占据主导，景物扭曲程度加剧"
    },
    periodExplanation: {
      belongsReason: "此画创作于梵高在圣雷米精神病院期间，画面中狂暴的旋涡笔触、神秘的蓝紫色调以及柏树、星空等主题的极端扭曲变形，都是圣雷米时期区别于其他时期的核心特征",
      styleEvidence: [
        "整个夜空被狂暴的旋涡状笔触覆盖，能量感远超阿尔勒时期",
        "蓝紫色调与金黄色交织，带有神秘的精神气息，是圣雷米时期标志性色彩",
        "柏树如黑色火焰般扭曲升腾，变形程度远超阿尔勒时期",
        "画面空间感被消解，趋于抽象，体现了精神痛苦中的艺术升华"
      ]
    },
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
    investigationClues: {
      creationLocation: "法国勒阿弗尔港的清晨，画家从酒店窗口俯瞰港口",
      yearRangeHint: "19世纪70年代初，画家32岁，印象派诞生前夜",
      lifeEvent: "普法战争后回到法国，与雷诺阿、毕沙罗等共同筹备首届印象派展览",
      styleChangeHint: "从早期带有写实倾向的风景画转向彻底捕捉瞬间光影的印象派手法"
    },
    periodExplanation: {
      belongsReason: "此画是莫奈早期印象派时期的标志性作品，其标题直接催生了印象派名称，画面中松散快速的笔触、瞬间光影的捕捉和打破传统的明暗处理，都是早期印象派的核心特征",
      styleEvidence: [
        "松散快速的细碎笔触，不求精细轮廓，只捕捉光影瞬间印象",
        "打破传统暗色调，色彩明亮鲜活，直接在户外写生完成",
        "构图随意自然，取不对称布局，描绘日常生活片段",
        "对水面倒影和雾气氛围的精妙处理，是印象派标志性技法"
      ]
    },
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
    investigationClues: {
      creationLocation: "法国巴黎的工作室，画家长期在此居住工作",
      yearRangeHint: "20世纪30年代末，画家56岁，西班牙内战期间",
      lifeEvent: "西班牙内战爆发，纳粹德国轰炸格尔尼卡小镇，画家受委托为巴黎世博会西班牙馆创作",
      styleChangeHint: "从立体主义的形式探索转向将艺术作为政治表达工具，融合多种风格于一体"
    },
    periodExplanation: {
      belongsReason: "此画创作于毕加索晚期多变时期，画家在此阶段熔铸一切风格于一炉，格尔尼卡融合了立体主义的解构手法、新古典主义的宏大构图和超现实主义的潜意识意象，体现了晚期风格自由多变的特点",
      styleEvidence: [
        "黑白灰单色处理，带有报纸新闻的纪实感和悲剧的庄严性",
        "破碎解构的形象，多视角同时呈现，延续了立体主义语言",
        "人物造型扭曲变形，带有超现实主义的噩梦般意象",
        "宏大构图和象征性形象（公牛、马、母亲与死婴）体现了新古典主义的史诗感"
      ]
    },
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
    investigationClues: {
      creationLocation: "法国吉维尼花园的睡莲池边，画家在此建造了自己的东方风格花园",
      yearRangeHint: "20世纪初，画家66岁，已在吉维尼定居十余年",
      lifeEvent: "吉维尼花园日益成熟，睡莲池成为画家唯一的创作主题，开始系统性探索同一场景的光影变化",
      styleChangeHint: "从早期瞬间捕捉转向系统性系列探索，笔触更加融合，色彩层叠更为丰富"
    },
    periodExplanation: {
      belongsReason: "此画属于莫奈成熟期印象派阶段，画家在此时期开始以系列画方式系统探索同一场景的不同光影，笔触更加融合，色彩层叠丰富，构图趋于稳定和谐，这些都是成熟期区别于早期和晚年的核心特征",
      styleEvidence: [
        "笔触更加融合，色彩层叠丰富，注重整体氛围的营造",
        "构图趋于稳定和谐，开始追求画面的装饰性与平面感",
        "色彩丰富微妙，绿色、粉色、紫色等色调和谐交融",
        "物体仍保留可辨识的轮廓，尚未达到晚年近乎抽象的程度"
      ]
    },
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
    investigationClues: {
      creationLocation: "法国南部阿尔勒的黄房子，画家为高更准备的客房",
      yearRangeHint: "19世纪80年代末，画家35岁，正处于创作巅峰期",
      lifeEvent: "热切期待好友高更前来同住，将黄房子装饰为南方画室，希望建立艺术家共同体",
      styleChangeHint: "从巴黎时期的明亮色彩转向更强烈的黄蓝互补对比，旋涡状厚涂笔触趋于成熟"
    },
    periodExplanation: {
      belongsReason: "此画创作于梵高阿尔勒时期，强烈的黄色调、黄蓝互补对比、旋涡状厚涂笔触以及向日葵、黄房子等阿尔勒主题，都是这一时期区别于其他阶段的标志性特征",
      styleEvidence: [
        "强烈的黄色调是阿尔勒时期最醒目的标志，几乎贯穿所有重要作品",
        "厚涂的笔触表现花瓣质感，充满动势与能量，已形成标志性语言",
        "黄与蓝的互补对比达到极致饱和度，色彩主观性超越巴黎时期",
        "画面洋溢着狂热的喜悦与对生命的热爱，是阿尔勒时期情感基调"
      ]
    },
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
    investigationClues: {
      creationLocation: "荷兰纽南的乡村，画家与父母同住期间",
      yearRangeHint: "19世纪80年代中期，画家32岁，艺术生涯早期",
      lifeEvent: "在纽南乡村深入接触农民生活，深受米勒等现实主义画家影响，立志描绘劳苦大众",
      styleChangeHint: "尚未接触印象派，色调以暗褐色为主，笔触厚重粗犷但尚未形成后期旋涡状"
    },
    periodExplanation: {
      belongsReason: "此画是梵高荷兰时期的代表作，画面中暗褐色调、农民生活主题、厚重粗犷的笔触以及宗教般的悲悯情怀，都是荷兰时期区别于巴黎、阿尔勒等后期阶段的核心特征",
      styleEvidence: [
        "以褐色、暗绿、深灰等暗色调为主，色彩厚重沉闷，与后期明亮色彩截然不同",
        "笔触厚重粗犷，常用厚涂技法堆积颜料，但尚未形成后期流动的旋涡状",
        "人物造型朴实笨拙，真实再现农民的劳作状态与生活艰辛",
        "主题聚焦农民、织工等社会底层，带有宗教般的悲悯情怀"
      ]
    },
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
    investigationClues: {
      creationLocation: "法国巴黎蒙马特高地，画家与弟弟提奥同住",
      yearRangeHint: "19世纪80年代末，画家34岁，从荷兰到巴黎的第二年",
      lifeEvent: "结识高更、毕沙罗、修拉等印象派与新印象派画家，参观大量展览，艺术视野骤然开阔",
      styleChangeHint: "从荷兰时期的暗褐色调骤然转向明亮色彩，受新印象派影响使用小笔触并置技法"
    },
    periodExplanation: {
      belongsReason: "此画是梵高巴黎时期的代表作，画面中明亮的色彩、短小灵动的印象派笔触以及自画像和花卉等都市主题，构成了从荷兰时期向阿尔勒时期过渡的关键中间阶段",
      styleEvidence: [
        "色彩从暗褐色调骤然转为明亮丰富，调色板彻底改变",
        "笔触短小灵动，带有抖动感，受新印象派点彩技法影响",
        "小笔触并置使用，但远比修拉的严谨科学点彩更为自由感性",
        "色彩虽明亮，但尚未达到阿尔勒时期那种强烈的黄蓝互补对比"
      ]
    },
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
    investigationClues: {
      creationLocation: "法国巴黎蒙马特高地的\"洗衣船\"工作室",
      yearRangeHint: "20世纪初，画家26岁，立体主义革命前夜",
      lifeEvent: "在巴黎人类博物馆看到非洲面具后深受震撼，与马蒂斯等艺术家讨论原始艺术",
      styleChangeHint: "从玫瑰时期的温暖浪漫转向原始质朴的大地色调，人物开始几何化、面具化"
    },
    periodExplanation: {
      belongsReason: "此画是毕加索非洲时期的标志性作品，画面中几何化面具般的人物面部、块面化的身体结构、土红赭石的大地色系以及原始神秘的氛围，都是非洲时期区别于蓝色、玫瑰时期及后续立体主义的核心特征",
      styleEvidence: [
        "人物面部被简化为几何形状，类似非洲面具的造型，是非洲时期最鲜明的标志",
        "身体造型开始块面化，解构传统的人体比例，为立体主义奠基",
        "色调趋于土红、赭石、棕色等原始质朴的大地色系",
        "笔触粗犷有力，轮廓线变得硬朗明确，带有原始艺术的力量感"
      ]
    },
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
    investigationClues: {
      creationLocation: "西班牙巴塞罗那和法国巴黎之间辗转，居无定所",
      yearRangeHint: "20世纪初，画家22岁，艺术生涯的起点",
      lifeEvent: "好友卡萨吉马斯因失恋自杀，画家陷入深深的抑郁，贫困潦倒",
      styleChangeHint: "从早期多样色彩转为以冷蓝色为主的单色表达，人物造型拉长瘦削"
    },
    periodExplanation: {
      belongsReason: "此画是毕加索蓝色时期的代表作，画面中单一的冷蓝色调、拉长瘦削的人物形象、社会边缘人的主题以及忧郁悲凉的情绪，都是蓝色时期区别于玫瑰时期、非洲时期等后续阶段的核心特征",
      styleEvidence: [
        "以深蓝、蓝绿等冷色调为主，单色倾向强烈，色彩压抑深沉",
        "人物形象拉长瘦削，常以剪影式轮廓呈现，突出悲凉感",
        "笔触较为克制内敛，线条流畅但带有沉重感，不同于后期的粗犷",
        "主题聚焦乞丐、盲人、流浪汉等社会边缘人物，充满悲悯"
      ]
    },
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
    investigationClues: {
      creationLocation: "法国巴黎蒙马特高地，画家与恋人费尔南德同住",
      yearRangeHint: "20世纪初，画家24岁，艺术生涯的转折点",
      lifeEvent: "与费尔南德·奥利维耶相遇相恋，心情从抑郁中复苏，常去马戏团写生",
      styleChangeHint: "从蓝色时期的冷蓝忧郁转向玫瑰红与橘红的暖色调，人物造型趋于圆润丰满"
    },
    periodExplanation: {
      belongsReason: "此画是毕加索玫瑰时期的代表作，画面中温暖的玫瑰红与橘红色调、圆润丰满的人物造型、马戏团少年等主题以及温柔浪漫的诗意情绪，都是玫瑰时期区别于蓝色时期和后续非洲时期的核心特征",
      styleEvidence: [
        "玫瑰红、橘红、粉色等暖色调为主，色彩明亮温暖，与蓝色时期形成鲜明对比",
        "人物造型圆润丰满，不同于蓝色时期的拉长瘦削",
        "笔触更为柔和轻盈，造型趋于饱满，带有温柔怀旧的诗意",
        "主题常涉及马戏团演员、少年、恋人等充满生活气息的形象"
      ]
    },
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
    investigationClues: {
      creationLocation: "法国巴黎，与布拉克共同探索立体主义的工作室",
      yearRangeHint: "20世纪10年代初，画家31岁，立体主义发展的关键期",
      lifeEvent: "与布拉克紧密合作探索分析立体主义，开始实验拼贴等新材料，打破绘画传统边界",
      styleChangeHint: "从分析立体主义的几何解构转向综合立体主义，引入拼贴、报纸等真实物质材料"
    },
    periodExplanation: {
      belongsReason: "此画是毕加索立体主义时期综合立体主义阶段的代表作，画面中几何块面分割的多视角解构、棕灰赭的中性色调以及首次引入的拼贴技法，都是立体主义时期区别于其他阶段的核心特征",
      styleEvidence: [
        "以棕、灰、赭等中性色为主，聚焦于形式结构而非情感表达",
        "多视角同时呈现，物体被解构为几何碎片后重新组合",
        "首次使用拼贴技法，将真实藤椅图案油布贴在画布上",
        "笔触消失于几何块面之中，以清晰的直线与弧线分割画面"
      ]
    },
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
    investigationClues: {
      creationLocation: "法国诺曼底地区鲁昂市，画家在大教堂对面租房间观察不同光线",
      yearRangeHint: "19世纪90年代，画家54岁，已在吉维尼花园定居",
      lifeEvent: "在鲁昂连续数月从清晨到黄昏追踪同一场景的光线变化，系统性探索时间流逝的视觉效果",
      styleChangeHint: "从早期瞬间捕捉转向系统性的系列画探索，笔触更加融合，色彩层叠更为丰富"
    },
    periodExplanation: {
      belongsReason: "此画是莫奈成熟期印象派阶段的代表作，画家在此时期以系列画方式系统探索同一场景的不同光影，笔触更加融合，色彩层叠丰富，构图趋于稳定和谐，这些都是成熟期区别于早期和晚年的核心特征",
      styleEvidence: [
        "笔触更加融合，色彩层叠丰富，注重整体氛围的营造而非单个物体轮廓",
        "构图趋于稳定和谐，追求画面的装饰性与平面感",
        "同一场景呈现出截然不同的色调，色彩随光线变化丰富微妙",
        "以系统性科学的方式探索光影变化，区别于早期的随机瞬间捕捉"
      ]
    },
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
    investigationClues: {
      creationLocation: "法国吉维尼花园的睡莲池边，画家在此建造了巨大的画室",
      yearRangeHint: "20世纪初至中期，画家76岁至86岁，生命的最后十年",
      lifeEvent: "晚年因白内障视力严重衰退，受法国政府委托为巴黎橘园美术馆创作大型装饰壁画",
      styleChangeHint: "从成熟期的系列画探索转向近乎抽象的色彩交融，地平线消失，具象形体几乎完全消解"
    },
    periodExplanation: {
      belongsReason: "此画是莫奈晚年睡莲时期的集大成之作，画面中地平线的消失、具象形体的消解、蓝绿粉紫色调的自由交融以及无限延伸的空间感，都是晚年睡莲时期区别于早期和成熟期的核心特征",
      styleEvidence: [
        "没有地平线与空间透视，水面倒影与真实景物融为一体，形成无限延伸的空间",
        "笔触极为自由奔放，画面趋于抽象表现，几乎消解了具象形体",
        "蓝、绿、粉、紫等色调相互交融渗透，几乎没有明确界限，接近东方水墨画意境",
        "因白内障视力衰退带来的意外解放，色彩趋于纯净抽象，超越了自然观察"
      ]
    },
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

export type ForgeryVerdict = "authentic" | "copy" | "styleImitation";

export type ForgeryClueType =
  | "brushstrokeDetail"
  | "signatureAnalysis"
  | "pigmentDating"
  | "compositionStyle"
  | "uvExamination"
  | "canvasTexture"
  | "archiveComparison"
  | "provenanceRecord";

export interface ForgeryClue {
  type: ForgeryClueType;
  label: string;
  labelEn: string;
  cost: number;
  content: string;
  hintText: string;
  visualEffect?: "uv" | "texture" | "comparison" | "signature" | "pigment";
}

export interface ForgeryReportSection {
  title: string;
  content: string;
  isEvidence: boolean;
}

export interface ForgeryCase {
  id: string;
  caseTitle: string;
  paintingId: string;
  displayedArtist: string;
  displayedYear: string;
  groundTruth: ForgeryVerdict;
  correctArtist: string;
  correctYear: string;
  caseBriefing: string;
  difficulty: "normal" | "hard" | "expert";
  clues: ForgeryClue[];
  report: {
    summary: string;
    evidenceForVerdict: ForgeryReportSection[];
    misleadingFeatures: { feature: string; explanation: string }[];
    historicalContext: string;
  };
}

export const forgeryCases: ForgeryCase[] = [
  {
    id: "forgery-1",
    caseTitle: "失踪的向日葵",
    paintingId: "12",
    displayedArtist: "文森特·梵高",
    displayedYear: "1888",
    groundTruth: "copy",
    correctArtist: "无名氏（临摹者）",
    correctYear: "1950年代",
    caseBriefing: "某拍卖行收到一幅声称是梵高《向日葵》系列的未公开作品，卖方称其为梵高在阿尔勒时期赠予友人的私藏。请仔细鉴定其真伪。",
    difficulty: "normal",
    clues: [
      {
        type: "brushstrokeDetail",
        label: "笔触细节",
        labelEn: "Brushstroke Detail",
        cost: 15,
        content: "笔触虽然模仿了梵高的厚涂技法，但笔触方向过于刻意整齐，缺乏梵高笔触中那种无意识的流动感和能量。颜料堆积的厚度均匀，缺少自然的随机变化。",
        hintText: "放大观察笔触的方向与颜料厚度",
        visualEffect: "texture",
      },
      {
        type: "signatureAnalysis",
        label: "签名分析",
        labelEn: "Signature Analysis",
        cost: 20,
        content: "画布右下角的签名「Vincent」虽然模仿了梵高的笔迹，但字母 V 的起笔角度与真迹有微妙差异，墨水渗透方式显示签名是在颜料干透后很久才添加上去的。",
        hintText: "检查签名的笔迹与年代",
        visualEffect: "signature",
      },
      {
        type: "pigmentDating",
        label: "颜料年代检测",
        labelEn: "Pigment Dating",
        cost: 25,
        content: "颜料样本分析显示，画中使用了钛白（Titanium White）颜料。这种颜料在1916年才获得专利并广泛使用，而梵高1890年就已去世，不可能使用这种颜料。",
        hintText: "分析颜料的化学成分与年代",
        visualEffect: "pigment",
      },
      {
        type: "compositionStyle",
        label: "构图风格",
        labelEn: "Composition Style",
        cost: 15,
        content: "整体构图过于对称和规整，梵高的向日葵系列通常带有更强烈的不对称张力和动态感。花朵的排列方式更接近教科书式的临摹，而非梵高那种充满激情的即兴表达。",
        hintText: "分析整体构图的布局与张力",
      },
      {
        type: "uvExamination",
        label: "紫外线观察",
        labelEn: "UV Examination",
        cost: 30,
        content: "紫外线照射下，画面部分区域显示出异常的荧光反应。这些区域使用了现代合成树脂作为上光材料，而19世纪的画作应该使用天然树脂（如达玛树脂），后者在紫外线下不会产生这种荧光。",
        hintText: "使用紫外线检查上光层与修复痕迹",
        visualEffect: "uv",
      },
      {
        type: "canvasTexture",
        label: "画布纹理分析",
        labelEn: "Canvas Texture",
        cost: 20,
        content: "画布的经纬线密度和编织方式与梵高在阿尔勒时期使用的画布不符。显微镜下可见画布纤维经过现代化学处理，这是20世纪中期以后才出现的处理工艺。",
        hintText: "放大观察画布纤维与编织方式",
        visualEffect: "texture",
      },
      {
        type: "archiveComparison",
        label: "档案对比",
        labelEn: "Archive Comparison",
        cost: 25,
        content: "将此画与阿姆斯特丹梵高博物馆馆藏的五幅真迹《向日葵》进行数字对比，花瓣边缘的处理方式与梵高真迹存在系统性差异。梵高书信中也从未提及赠予友人一幅未公开的向日葵。",
        hintText: "与博物馆档案中的真迹进行对比",
        visualEffect: "comparison",
      },
      {
        type: "provenanceRecord",
        label: "来源记录调查",
        labelEn: "Provenance Record",
        cost: 20,
        content: "卖方提供的来源记录链条存在断裂。据称1940年代由一位私人收藏家购得，但该时期的任何拍卖记录、展览目录或学术文献中均无此画的记载。",
        hintText: "追溯作品的收藏和交易历史",
      },
    ],
    report: {
      summary: "综合检测结果，此画为一幅制作精良的临摹作品，创作时间约为1950年代。尽管临摹者在笔触和构图上极力模仿梵高，但现代颜料的使用和画布处理工艺彻底暴露了其伪作身份。",
      evidenceForVerdict: [
        { title: "颜料铁证", content: "钛白颜料1916年才获得专利，梵高1890年去世，不可能使用。这是判定为伪作的决定性证据。", isEvidence: true },
        { title: "签名破绽", content: "签名在颜料干透很久后添加，笔迹细节与真迹不符。", isEvidence: true },
        { title: "画布工艺", content: "画布纤维经过20世纪中期才出现的现代化学处理。", isEvidence: true },
        { title: "紫外线异常", content: "使用了现代合成树脂上光，19世纪画作应使用天然树脂。", isEvidence: true },
      ],
      misleadingFeatures: [
        { feature: "黄色调与厚涂笔触", explanation: "临摹者刻意模仿了梵高标志性的黄色调和厚涂技法，乍看之下极具欺骗性。但仔细观察会发现笔触过于刻意，缺乏真迹中无意识的流动感。" },
        { feature: "向日葵主题", explanation: "选择梵高最著名的系列之一作为仿冒对象，利用了大众对该主题的熟悉感和情感认同，降低了人们的警惕性。" },
      ],
      historicalContext: "梵高的《向日葵》系列是艺术史上最知名的作品之一，也是被仿冒最多的作品。已知的梵高伪作超过1000幅，二战后至1960年代是梵高伪作的高峰期，当时许多赝品流入市场。",
    },
  },
  {
    id: "forgery-2",
    caseTitle: "蒙娜丽莎的影子",
    paintingId: "2",
    displayedArtist: "列奥纳多·达·芬奇",
    displayedYear: "1503-1519",
    groundTruth: "styleImitation",
    correctArtist: "16世纪追随者",
    correctYear: "约1550年",
    caseBriefing: "一座私人城堡中发现了一幅与《蒙娜丽莎》极为相似的画作，被认为可能是达芬奇工作室的另一版本。请鉴定这幅画的真实身份。",
    difficulty: "hard",
    clues: [
      {
        type: "brushstrokeDetail",
        label: "笔触细节",
        labelEn: "Brushstroke Detail",
        cost: 20,
        content: "虽然运用了晕涂法（Sfumato），但过渡层的细腻程度与达芬奇真迹存在差距。达芬奇的晕涂需要多达30层薄涂，而此画约15层就能达到类似的视觉效果，层厚明显更大。",
        hintText: "观察晕涂法的细腻程度",
        visualEffect: "texture",
      },
      {
        type: "signatureAnalysis",
        label: "签名与标记",
        labelEn: "Signature & Markings",
        cost: 15,
        content: "与达芬奇多数作品一样，此画没有显著签名。但在画面边缘发现了一个不属于达芬奇工作室惯用标记的神秘缩写，风格指向16世纪中期的北意大利画家。",
        hintText: "检查画面边缘是否有隐藏标记",
      },
      {
        type: "pigmentDating",
        label: "颜料年代检测",
        labelEn: "Pigment Dating",
        cost: 25,
        content: "颜料成分与16世纪上半叶基本吻合，没有发现达芬奇去世后才出现的颜料。这排除了现代伪作的可能性，但无法区分是真迹还是同时代追随者的作品。",
        hintText: "分析颜料成分判断大致年代",
        visualEffect: "pigment",
      },
      {
        type: "compositionStyle",
        label: "构图风格",
        labelEn: "Composition Style",
        cost: 20,
        content: "整体构图几乎完全复制了卢浮宫版本，但背景中远山的处理方式更为程式化，缺少达芬奇那种空气透视的层次感。人物比例略有差异，肩部更宽。",
        hintText: "对比背景山水与人物比例细节",
      },
      {
        type: "uvExamination",
        label: "紫外线观察",
        labelEn: "UV Examination",
        cost: 30,
        content: "紫外线显示此画经过多次修复，但底层草图的轮廓线处理方式与达芬奇的素描风格不同。达芬奇的草图通常使用左手线条，此画底层草图为右手绘制。",
        hintText: "紫外线透视底层草图",
        visualEffect: "uv",
      },
      {
        type: "canvasTexture",
        label: "画布与底板分析",
        labelEn: "Support Analysis",
        cost: 20,
        content: "此画使用杨木底板，这与达芬奇的习惯一致。但底板的厚度和拼接方式与卢浮宫版本存在差异，树木年轮测年显示木材采伐于1530年左右，此时达芬奇已去世11年。",
        hintText: "分析木质底板的年代与工艺",
        visualEffect: "texture",
      },
      {
        type: "archiveComparison",
        label: "档案与文献对比",
        labelEn: "Archive Comparison",
        cost: 25,
        content: "与卢浮宫版本进行高清数字对比，发现此画的每一个细节都刻意模仿原作，但手指的微妙姿态和嘴唇曲线的处理带有模仿者的个人习惯。达芬奇真迹中左右手食指的间距更窄。",
        hintText: "与卢浮宫真迹进行像素级对比",
        visualEffect: "comparison",
      },
      {
        type: "provenanceRecord",
        label: "来源记录调查",
        labelEn: "Provenance Record",
        cost: 20,
        content: "来源记录可追溯至17世纪的一位威尼斯贵族收藏，但16世纪的记录缺失。考虑到16世纪中期北意大利出现了大量达芬奇追随者，此画很可能是那一时期的工作室复制品。",
        hintText: "追溯16世纪的收藏历史",
      },
    ],
    report: {
      summary: "此画并非达芬奇真迹，而是16世纪中期（约1550年）一位北意大利画家的风格模仿作品。尽管作画年代符合文艺复兴时期，且临摹技巧精湛，但底板的树木年轮测年和草图的右手绘制方式，以及背景山水的程式化处理，都指向这是一位达芬奇追随者的作品。",
      evidenceForVerdict: [
        { title: "底板年代", content: "树木年轮测年显示木材采伐于1530年左右，此时达芬奇已去世11年，不可能使用此底板创作。", isEvidence: true },
        { title: "右手草图", content: "底层草图为右手绘制线条，而达芬奇是左撇子，所有素描均用左手完成。", isEvidence: true },
        { title: "背景程式化", content: "远山处理缺少达芬奇空气透视的层次感，更接近16世纪中期风格主义画家的手法。", isEvidence: true },
        { title: "晕涂层数不足", content: "仅约15层薄涂，达芬奇真迹的晕涂法通常需要30层以上才能达到那种极致的朦胧效果。", isEvidence: true },
      ],
      misleadingFeatures: [
        { feature: "颜料年代吻合", explanation: "使用了16世纪上半叶的颜料，容易让鉴定者误认为是同时期真迹。但同时代的追随者同样会使用当时的材料。" },
        { feature: "杨木底板", explanation: "临摹者正确使用了达芬奇偏好的杨木底板，增加了欺骗性。但底板的具体年代和拼接方式仍暴露了破绽。" },
      ],
      historicalContext: "文艺复兴时期，大师的追随者和学生常会复制老师的作品以学习技法。达芬奇的《蒙娜丽莎》在他生前就已声名远扬，16世纪出现了许多优秀的复制品。这些同期复制品本身也具有相当的艺术价值和市场价格，有时可达数百万美元，但远不及真迹。",
    },
  },
  {
    id: "forgery-3",
    caseTitle: "星夜的秘密",
    paintingId: "1",
    displayedArtist: "文森特·梵高",
    displayedYear: "1889",
    groundTruth: "authentic",
    correctArtist: "文森特·梵高",
    correctYear: "1889",
    caseBriefing: "一幅从私人收藏中浮出水面的画作，声称是梵高《星月夜》的同期姊妹作。卖方提供了看似完整的来源记录。请鉴定此画是否为梵高真迹。",
    difficulty: "expert",
    clues: [
      {
        type: "brushstrokeDetail",
        label: "笔触细节",
        labelEn: "Brushstroke Detail",
        cost: 20,
        content: "旋涡状的笔触充满动势与能量，笔触方向具有高度的一致性和节奏感，与圣雷米时期的典型特征完全吻合。颜料厚度分布自然，旋涡中心颜料堆积更厚，边缘逐渐变薄，这是梵高独有的运笔习惯。",
        hintText: "仔细观察旋涡笔触的能量与方向",
        visualEffect: "texture",
      },
      {
        type: "signatureAnalysis",
        label: "签名分析",
        labelEn: "Signature Analysis",
        cost: 20,
        content: "此画没有画布正面签名，这与梵高在圣雷米时期的习惯一致——他在这一时期的作品多数不签名，而是在画作背面标注。背面确实有他标志性的手写编号和缩略标题，墨水分析也符合年代。",
        hintText: "检查画布背面的标记",
        visualEffect: "signature",
      },
      {
        type: "pigmentDating",
        label: "颜料年代检测",
        labelEn: "Pigment Dating",
        cost: 25,
        content: "所有颜料均可追溯至1880年代末，包括梵高常用的普鲁士蓝、铬黄和翠绿。未发现任何1889年之后才出现的颜料。颜料的结合剂分析指向同时期的亚麻籽油配方。",
        hintText: "检测颜料中是否有后世才发明的成分",
        visualEffect: "pigment",
      },
      {
        type: "compositionStyle",
        label: "构图风格",
        labelEn: "Composition Style",
        cost: 20,
        content: "柏树的螺旋升腾姿态、天空中星云的涡旋结构、村庄灯火的暖黄色点，都与圣雷米时期的视觉语言高度一致。画面左下角的村庄被刻意压暗以突出夜空，这是梵高常用的明暗对比策略。",
        hintText: "分析柏树、星云、村庄等元素的布局",
      },
      {
        type: "uvExamination",
        label: "紫外线观察",
        labelEn: "UV Examination",
        cost: 30,
        content: "紫外线照射下，仅发现少量19世纪天然树脂上光材料，荧光反应正常。画面几乎没有过度修复的痕迹，仅有边缘处几处非常自然的老化修补，与画作年代相符。",
        hintText: "检查是否有现代上光或修复材料",
        visualEffect: "uv",
      },
      {
        type: "canvasTexture",
        label: "画布纹理分析",
        labelEn: "Canvas Texture",
        cost: 20,
        content: "画布为标准的15号法式肖像画布，经纬密度与梵高在圣雷米时期使用的完全一致。画布背面有巴黎画商 Tanguy 的印章，这是梵高购买画布的固定供应商。",
        hintText: "检查画布规格与供应商标记",
        visualEffect: "texture",
      },
      {
        type: "archiveComparison",
        label: "档案对比",
        labelEn: "Archive Comparison",
        cost: 25,
        content: "梵高在1889年6月16日写给弟弟提奥的信中提到：「我正在画一幅新的星空习作，比上次的更奔放一些」，经学者比对，此画的尺寸和主题与信中描述完全吻合。画背面的编号也与提奥的收藏清单一致。",
        hintText: "查阅梵高书信与提奥的收藏档案",
        visualEffect: "comparison",
      },
      {
        type: "provenanceRecord",
        label: "来源记录调查",
        labelEn: "Provenance Record",
        cost: 20,
        content: "来源链条完整：从提奥遗孀乔安娜·梵高·邦格，到阿姆斯特丹市立博物馆的短期借展，到1920年代被一位瑞士银行家私人收购，此后在家族中传承至今。每一次交易均有文件佐证。",
        hintText: "验证从提奥至今的完整收藏链",
      },
    ],
    report: {
      summary: "经过全面检测与档案比对，确认此画为文森特·梵高1889年在圣雷米精神病院期间创作的真迹。画作的笔触特征、颜料成分、画布供应商标记、梵高书信中的提及以及完整的来源链条，构成了无可辩驳的证据链。",
      evidenceForVerdict: [
        { title: "书信铁证", content: "梵高1889年6月16日写给提奥的信中明确描述了一幅「新的星空习作」，尺寸和主题与此画完全吻合。", isEvidence: true },
        { title: "来源链条完整", content: "从提奥遗孀到瑞士银行家家族的百年收藏传承，每一步都有文件佐证，这对于梵高作品来说是极为难得的完整来源记录。", isEvidence: true },
        { title: "供应商印章", content: "画布背面有巴黎画商 Tanguy 的印章，这是梵高购买画布的固定供应商，圣雷米时期的其他真迹也有同样标记。", isEvidence: true },
        { title: "笔触特征一致", content: "旋涡笔触的能量感、颜料厚度的自然分布、明暗对比策略，均与圣雷米时期的艺术语言高度一致。", isEvidence: true },
      ],
      misleadingFeatures: [
        { feature: "与《星月夜》高度相似", explanation: "正因为这幅画与知名的《星月夜》太过相似，初看时容易让人怀疑是刻意仿冒。但梵高在同一时期确实会对同一主题进行多次变体创作。" },
        { feature: "私人收藏长期未公开", explanation: "如此重要的梵高作品长期隐匿于私人收藏，容易引发质疑。但1920年代欧洲富人购买艺术品后秘不示人是常见现象。" },
      ],
      historicalContext: "梵高一生创作了约2100幅作品，其中约860幅油画。由于他生前默默无闻，许多作品在早期缺乏系统记录。即使在今天，仍偶尔有梵高真迹从私人收藏中被重新发现。2013年，一幅梵高1888年的风景画《蒙马儒的日落》在挪威被重新鉴定为真迹，此前一直被认为是伪作。",
    },
  },
  {
    id: "forgery-4",
    caseTitle: "睡莲池的倒影",
    paintingId: "11",
    displayedArtist: "克劳德·莫奈",
    displayedYear: "1906",
    groundTruth: "copy",
    correctArtist: "20世纪仿冒者",
    correctYear: "约1980年代",
    caseBriefing: "一幅据称是莫奈吉维尼花园睡莲系列的私人收藏作品出现在艺术市场上。卖家声称此画从未公开展出，是莫奈赠予园丁的礼物。请进行鉴定。",
    difficulty: "normal",
    clues: [
      {
        type: "brushstrokeDetail",
        label: "笔触细节",
        labelEn: "Brushstroke Detail",
        cost: 15,
        content: "笔触虽然松散，但缺少莫奈那种层次叠加的透明感。每一笔的色彩过于均匀饱和，而莫奈的笔触通常带有颜色的微妙混合和不透明与透明层的交替叠加。",
        hintText: "观察笔触的层次感与色彩混合",
        visualEffect: "texture",
      },
      {
        type: "signatureAnalysis",
        label: "签名分析",
        labelEn: "Signature Analysis",
        cost: 20,
        content: "签名「Claude Monet」位于画面左下角，字体模仿得相当逼真。但高倍放大镜下可见签名边缘有轻微的模板印刷痕迹，表明签名可能是通过丝网印刷后手工润色的。",
        hintText: "高倍放大检查签名边缘",
        visualEffect: "signature",
      },
      {
        type: "pigmentDating",
        label: "颜料年代检测",
        labelEn: "Pigment Dating",
        cost: 25,
        content: "检测出喹吖啶酮红（Quinacridone Red），这种有机颜料在1958年才由杜邦公司发明并商业化生产。莫奈1926年去世，不可能使用这种颜料。此外，绿色颜料中含有酞菁绿，同样是1930年代后才出现的。",
        hintText: "查找是否含有20世纪中后期的颜料成分",
        visualEffect: "pigment",
      },
      {
        type: "compositionStyle",
        label: "构图风格",
        labelEn: "Composition Style",
        cost: 15,
        content: "睡莲的分布过于均匀对称，缺少莫奈成熟期作品中那种看似随意实则精心安排的自然感。水面倒影的处理过于清晰明确，莫奈会让倒影与真实景物更加模糊交融。",
        hintText: "分析睡莲分布与倒影的清晰度",
      },
      {
        type: "uvExamination",
        label: "紫外线观察",
        labelEn: "UV Examination",
        cost: 30,
        content: "紫外线显示大面积强烈的蓝白色荧光，这是现代丙烯酸上光剂的典型特征。19世纪末至20世纪初的画作应使用天然达玛树脂或玛蒂树脂，荧光反应微弱且呈淡黄色。",
        hintText: "观察上光材料的荧光反应",
        visualEffect: "uv",
      },
      {
        type: "canvasTexture",
        label: "画布纹理分析",
        labelEn: "Canvas Texture",
        cost: 20,
        content: "画布使用了现代的机器编织工艺，经纬线的均匀度远超1900年代的手工编织画布。画布边缘可见工业切割的整齐痕迹，而那个时代的画布通常是手工裁切，边缘会略有毛边。",
        hintText: "检查画布编织工艺与切割方式",
        visualEffect: "texture",
      },
      {
        type: "archiveComparison",
        label: "档案对比",
        labelEn: "Archive Comparison",
        cost: 25,
        content: "与马摩丹莫奈博物馆和橘园美术馆的睡莲真迹对比，此画中睡莲花瓣的画法与莫奈的典型笔触存在系统性差异。莫奈的睡莲花瓣通常用3-5笔快速完成，此画每片花瓣都经过了反复描绘。",
        hintText: "对比真迹中花瓣的运笔方式",
        visualEffect: "comparison",
      },
      {
        type: "provenanceRecord",
        label: "来源记录调查",
        labelEn: "Provenance Record",
        cost: 20,
        content: "「赠予园丁」的说法无法得到任何文献支撑。莫奈的书信和吉维尼庄园的记录中从未提到过赠予园丁画作的事情。卖方提供的1950年代照片经过数字取证，发现是经过Photoshop修改的。",
        hintText: "调查赠予园丁的故事是否有文献佐证",
      },
    ],
    report: {
      summary: "此画为1980年代的仿冒作品。尽管临摹者在构图和色彩上做了相当精细的模仿，但多种现代颜料的使用（喹吖啶酮红、酞菁绿）、现代丙烯酸上光剂、机器编织画布，以及被篡改的来源照片，构成了完整的伪作证据链。",
      evidenceForVerdict: [
        { title: "颜料铁证", content: "喹吖啶酮红（1958年发明）和酞菁绿（1930年代后出现）均在莫奈去世数十年后才问世，这是最致命的证据。", isEvidence: true },
        { title: "现代上光剂", content: "紫外线显示使用了现代丙烯酸上光剂，与莫奈时代的天然树脂不符。", isEvidence: true },
        { title: "工业画布", content: "机器编织的画布和工业切割边缘均为20世纪后期特征。", isEvidence: true },
        { title: "签名伪造", content: "高倍放大发现签名有丝网印刷模板痕迹，非手写真迹。", isEvidence: true },
      ],
      misleadingFeatures: [
        { feature: "色彩总体接近", explanation: "仿冒者正确捕捉了莫奈睡莲系列的整体色调（绿色、粉色、紫色交融），在远距离观看时具有相当的欺骗性。" },
        { feature: "「赠予园丁」的浪漫故事", explanation: "伪作者编选了一个听起来合情合理的叙事，利用了人们对艺术家与普通人之间温情故事的心理偏好，降低了初查时的警惕。" },
      ],
      historicalContext: "莫奈的睡莲系列是艺术史上最受追捧的作品之一，真品价格通常超过5000万美元。1980-1990年代是印象派伪作的高峰期，当时大量赝品涌入日本和美国的新富藏家市场。著名的伪作画匠如约翰·梅亚特（John Myatt）就曾仿冒过莫奈作品，他的赝品一度被苏富比和佳士得当作真迹拍卖。",
    },
  },
];

export function getForgeryCaseById(id: string): ForgeryCase | undefined {
  return forgeryCases.find((c) => c.id === id);
}

export function getAllForgeryCases(): ForgeryCase[] {
  return [...forgeryCases];
}

export type ConfusionDimension = "color" | "brushstroke" | "light" | "composition" | "theme" | "emotion";

export interface ConfusionDimensionDiff {
  dimension: ConfusionDimension;
  dimensionLabel: string;
  description: string;
}

export interface ConfusionCampItem {
  id: string;
  label: string;
  labelEn: string;
  type: "artist" | "period" | "movement";
  description: string;
  keyFeatures: string[];
}

export interface ConfusionCampCombination {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  difficulty: "normal" | "hard" | "expert";
  items: ConfusionCampItem[];
  keyDifferences: ConfusionDimensionDiff[];
  paintingIds: string[];
  background: string;
}

export type ConfusionCampQuestionType = "artist" | "period" | "movement";

export interface ConfusionCampQuestion {
  id: string;
  paintingId: string;
  questionType: ConfusionCampQuestionType;
  questionText: string;
  options: string[];
  correctAnswer: string;
  correctItemId: string;
  confusionExplanation: string;
  keyDimensions: ConfusionDimension[];
}

export interface ConfusionCampAnswer {
  questionId: string;
  paintingId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  correctItemId: string;
  selectedItemId: string | null;
  timeSpent: number;
  answeredAt: number;
}

export interface MisjudgmentPattern {
  confusedPair: [string, string];
  count: number;
  dimensions: ConfusionDimension[];
  description: string;
  tip: string;
}

export interface StyleIdentificationReport {
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  averageTimePerQuestion: number;
  misjudgmentPatterns: MisjudgmentPattern[];
  weakDimensions: { dimension: ConfusionDimension; label: string; errorRate: number }[];
  strongDimensions: { dimension: ConfusionDimension; label: string; accuracy: number }[];
  progressMessage: string;
  improvementTips: string[];
}

export const DIMENSION_LABELS: Record<ConfusionDimension, string> = {
  color: "色彩",
  brushstroke: "笔触",
  light: "光影",
  composition: "构图",
  theme: "主题",
  emotion: "情感表达",
};

export const confusionCampCombinations: ConfusionCampCombination[] = [
  {
    id: "vangogh-munch",
    title: "梵高 vs 蒙克：旋涡中的呐喊",
    titleEn: "Van Gogh vs Munch",
    subtitle: "后印象派与表现主义先驱的情感旋涡",
    difficulty: "hard",
    items: [
      {
        id: "vangogh",
        label: "文森特·梵高",
        labelEn: "Vincent van Gogh",
        type: "artist",
        description: "荷兰后印象派大师，以强烈的色彩和旋涡状笔触表达对生命的炽热热爱。",
        keyFeatures: [
          "黄蓝互补色的强烈对比",
          "流动的旋涡状厚涂笔触",
          "情感外放、充满生命力",
          "南方阳光般的明亮色调",
        ],
      },
      {
        id: "munch",
        label: "爱德华·蒙克",
        labelEn: "Edvard Munch",
        type: "artist",
        description: "挪威表现主义先驱，以扭曲的线条和深沉的色调传达存在的焦虑。",
        keyFeatures: [
          "深暗的蓝绿与血红配色",
          "波浪状扭曲线条，更尖锐焦虑",
          "情感内省、充满存在焦虑",
          "北欧寒冷的阴郁氛围",
        ],
      },
    ],
    keyDifferences: [
      {
        dimension: "color",
        dimensionLabel: "色彩",
        description: "梵高：黄蓝强烈互补，明亮炽热；蒙克：蓝绿与血红，深沉阴郁。",
      },
      {
        dimension: "brushstroke",
        dimensionLabel: "笔触",
        description: "梵高：厚涂旋涡，流动有序，充满能量；蒙克：细线扭曲，尖锐抖动，更焦虑。",
      },
      {
        dimension: "emotion",
        dimensionLabel: "情感",
        description: "梵高：对生命的热爱与狂喜；蒙克：对死亡与存在的焦虑与恐惧。",
      },
      {
        dimension: "theme",
        dimensionLabel: "主题",
        description: "梵高：向日葵、麦田、星空（生命与自然）；蒙克：呐喊、病孩、死亡（人类痛苦）。",
      },
    ],
    paintingIds: ["1", "9", "12", "13", "14"],
    background: "梵高与蒙克都是19世纪末表达性绘画的先驱，两人都以扭曲的形式和强烈的色彩表达内心情感。梵高的旋涡充满生命能量，蒙克的扭曲则传达存在焦虑。他们共同影响了20世纪表现主义的发展。",
  },
  {
    id: "monet-renoir",
    title: "莫奈 vs 雷诺阿：光影双生子",
    titleEn: "Monet vs Renoir",
    subtitle: "印象派奠基人的微妙差异",
    difficulty: "normal",
    items: [
      {
        id: "monet",
        label: "克劳德·莫奈",
        labelEn: "Claude Monet",
        type: "artist",
        description: "印象派之父，专注于捕捉瞬间光影变化，对自然风景情有独钟。",
        keyFeatures: [
          "细碎灵动的笔触，更碎片化",
          "注重光线本身的变化",
          "以自然风景为主",
          "色彩偏冷（蓝绿紫）",
        ],
      },
      {
        id: "renoir",
        label: "皮埃尔·雷诺阿",
        labelEn: "Pierre-Auguste Renoir",
        type: "artist",
        description: "印象派核心人物，以描绘人物和欢乐的社交场景著称，笔触更柔和。",
        keyFeatures: [
          "羽毛般柔和的笔触，更融合",
          "注重人物肌肤的光影",
          "以人物、舞会、休闲为主",
          "色彩偏暖（粉红橘）",
        ],
      },
    ],
    keyDifferences: [
      {
        dimension: "brushstroke",
        dimensionLabel: "笔触",
        description: "莫奈：细碎灵动，更碎片化，像无数小色块拼贴；雷诺阿：羽毛般柔和，更融合，有奶油般的质感。",
      },
      {
        dimension: "theme",
        dimensionLabel: "主题",
        description: "莫奈：睡莲、干草堆、教堂（纯风景）；雷诺阿：煎饼磨坊的舞会、游艇上的午餐（人物休闲）。",
      },
      {
        dimension: "color",
        dimensionLabel: "色彩",
        description: "莫奈：蓝绿紫冷色调为主；雷诺阿：粉红橘暖色调为主，擅长描绘肤色。",
      },
      {
        dimension: "light",
        dimensionLabel: "光影",
        description: "莫奈：光线本身是主角，追踪不同时刻的光；雷诺阿：光影服务于人物，光斑洒在皮肤上。",
      },
    ],
    paintingIds: ["3", "11", "19", "20"],
    background: "莫奈与雷诺阿是印象派最亲密的伙伴，曾一起在户外写生多年。两人都打破了传统绘画的明暗法则，但莫奈更关注自然光线的瞬间变化，雷诺阿则更钟情于人物和欢乐的生活场景。",
  },
  {
    id: "davinci-michelangelo",
    title: "达芬奇 vs 米开朗基罗：文艺复兴的巨人对决",
    titleEn: "Da Vinci vs Michelangelo",
    subtitle: "佛罗伦萨两位天才的迥异风格",
    difficulty: "hard",
    items: [
      {
        id: "davinci",
        label: "列奥纳多·达·芬奇",
        labelEn: "Leonardo da Vinci",
        type: "artist",
        description: "文艺复兴全才，以晕涂法和神秘氛围著称，画面柔和朦胧。",
        keyFeatures: [
          "晕涂法（Sfumato），朦胧过渡",
          "画面柔和，轮廓模糊",
          "神秘内敛，如蒙娜丽莎的微笑",
          "科学与艺术的完美结合",
        ],
      },
      {
        id: "michelangelo",
        label: "米开朗基罗",
        labelEn: "Michelangelo",
        type: "artist",
        description: "雕塑家出身的画家，以雕塑般的人体和力量感著称，画面充满张力。",
        keyFeatures: [
          "雕塑般清晰的轮廓线",
          "肌肉线条夸张有力",
          "宏大雄伟，充满戏剧张力",
          "以人体为主要表现载体",
        ],
      },
    ],
    keyDifferences: [
      {
        dimension: "brushstroke",
        dimensionLabel: "笔触/技法",
        description: "达芬奇：晕涂法（Sfumato），30层薄涂，轮廓消失在朦胧中；米开朗基罗：清晰的轮廓线，如同雕塑的凿刻痕迹。",
      },
      {
        dimension: "composition",
        dimensionLabel: "构图",
        description: "达芬奇：金字塔构图，稳定和谐；米开朗基罗：旋转扭曲的S形构图，充满动势。",
      },
      {
        dimension: "theme",
        dimensionLabel: "主题",
        description: "达芬奇：肖像、宗教场景，注重人物心理；米开朗基罗：西斯廷天顶画、大卫雕塑，人体是唯一主题。",
      },
      {
        dimension: "light",
        dimensionLabel: "光影",
        description: "达芬奇：柔和的漫射光，没有强烈明暗对比；米开朗基罗：雕塑式强光，塑造肌肉体积感。",
      },
    ],
    paintingIds: ["2", "8"],
    background: "达芬奇与米开朗基罗是文艺复兴盛期最伟大的两位艺术家，也是佛罗伦萨的竞争对手。达芬奇年长23岁，是博学的全才；米开朗基罗更认为自己是雕塑家，以超人的意志力塑造宏伟的人体。两人的风格截然不同，共同定义了文艺复兴的高度。",
  },
  {
    id: "rembrandt-vermeer",
    title: "伦勃朗 vs 维米尔：荷兰黄金时代双璧",
    titleEn: "Rembrandt vs Vermeer",
    subtitle: "阿姆斯特丹与代尔夫特的光影对话",
    difficulty: "expert",
    items: [
      {
        id: "rembrandt",
        label: "伦勃朗",
        labelEn: "Rembrandt",
        type: "artist",
        description: "荷兰黄金时代最伟大的画家，以戏剧性的明暗对比和深刻的人物心理著称。",
        keyFeatures: [
          "伦勃朗光：聚光式强烈明暗对比",
          "画面厚重，颜料堆积有质感",
          "群像宏大，人物众多",
          "深刻的人性刻画，沧桑感",
        ],
      },
      {
        id: "vermeer",
        label: "约翰内斯·维米尔",
        labelEn: "Johannes Vermeer",
        type: "artist",
        description: "代尔夫特的画家，以静谧的室内场景和柔和的窗外光线著称，作品数量极少。",
        keyFeatures: [
          "柔和的漫射窗外光，均匀分布",
          "画面如瓷器般细腻光滑",
          "单个人物，室内静谧场景",
          "超然而平静，时间仿佛静止",
        ],
      },
    ],
    keyDifferences: [
      {
        dimension: "light",
        dimensionLabel: "光影",
        description: "伦勃朗：聚光式强烈明暗对比（ chiaroscuro ），大部分区域在暗部；维米尔：柔和的漫射窗外光，均匀照亮整个场景。",
      },
      {
        dimension: "brushstroke",
        dimensionLabel: "笔触",
        description: "伦勃朗：厚重粗犷，颜料堆积有实体感；维米尔：细腻光滑，如瓷器表面，几乎看不到笔触。",
      },
      {
        dimension: "composition",
        dimensionLabel: "构图",
        description: "伦勃朗：复杂的群像构图，人物众多层次丰富；维米尔：简洁的室内构图，1-2个人物，空间感强。",
      },
      {
        dimension: "emotion",
        dimensionLabel: "情感",
        description: "伦勃朗：深刻的人性、沧桑、悲剧感；维米尔：超然、静谧、日常诗意，时间仿佛静止。",
      },
    ],
    paintingIds: ["5", "10"],
    background: "伦勃朗和维米尔是荷兰黄金时代最伟大的两位画家，但风格迥异。伦勃朗在阿姆斯特丹名利双收后破产，一生创作了600多幅油画；维米尔在代尔夫特默默无名，仅存世36幅作品，生前穷困潦倒，死后两百年才被重新发现。",
  },
  {
    id: "picasso-dali",
    title: "毕加索 vs 达利：20世纪西班牙狂想",
    titleEn: "Picasso vs Dalí",
    subtitle: "立体主义解构与超现实梦境",
    difficulty: "expert",
    items: [
      {
        id: "picasso",
        label: "巴勃罗·毕加索",
        labelEn: "Pablo Picasso",
        type: "artist",
        description: "立体主义创始人，以多视角解构和形式革命著称，一生风格多变。",
        keyFeatures: [
          "几何块面，多视角同时呈现",
          "棕灰中性色为主（分析立体主义）",
          "智性解构，理性探索形式",
          "破碎重组的形象",
        ],
      },
      {
        id: "dali",
        label: "萨尔瓦多·达利",
        labelEn: "Salvador Dalí",
        type: "artist",
        description: "超现实主义大师，以精细写实技法描绘荒诞梦境，偏执批判法的实践者。",
        keyFeatures: [
          "精细如照片的写实技法",
          "色彩丰富鲜艳，对比强烈",
          "潜意识梦境，荒诞意象",
          "融化的时钟、大象等标志性符号",
        ],
      },
    ],
    keyDifferences: [
      {
        dimension: "brushstroke",
        dimensionLabel: "笔触/技法",
        description: "毕加索：几何块面分割，笔触消失于形式解构中；达利：精细如照片的学院派写实技法，纤毫毕现。",
      },
      {
        dimension: "color",
        dimensionLabel: "色彩",
        description: "毕加索（立体主义时期）：棕灰赭等中性色，低调克制；达利：色彩丰富鲜艳，强烈对比，视觉冲击强。",
      },
      {
        dimension: "theme",
        dimensionLabel: "主题",
        description: "毕加索：静物、乐器、肖像的形式解构；达利：融化的时钟、长脚大象、燃烧的长颈鹿等潜意识梦境意象。",
      },
      {
        dimension: "composition",
        dimensionLabel: "构图",
        description: "毕加索：多视角同时呈现，打破单一透视；达利：严格遵循传统透视法，即使梦境也写实呈现。",
      },
    ],
    paintingIds: ["4", "6", "15", "16", "17", "18"],
    background: "毕加索和达利都是20世纪最具影响力的西班牙艺术家。毕加索年长23岁，是现代艺术的奠基人，达利年轻时曾崇拜毕加索。两人在形式探索上都极具革命性，但毕加索走向了理性的立体主义解构，达利则走向了非理性的超现实梦境。",
  },
  {
    id: "vangogh-cezanne",
    title: "梵高 vs 塞尚：后印象派的两条路",
    titleEn: "Van Gogh vs Cézanne",
    subtitle: "情感的火焰 vs 形式的秩序",
    difficulty: "hard",
    items: [
      {
        id: "vangogh",
        label: "文森特·梵高",
        labelEn: "Vincent van Gogh",
        type: "artist",
        description: "后印象派的情感表达者，以主观色彩和动态笔触传递内心激情。",
        keyFeatures: [
          "主观的强烈色彩，情绪化",
          "流动的旋涡状笔触，充满动势",
          "画面整体处于能量流动中",
          "情感优先，为表达可扭曲现实",
        ],
      },
      {
        id: "cezanne",
        label: "保罗·塞尚",
        labelEn: "Paul Cézanne",
        type: "artist",
        description: "\"现代艺术之父\"，以几何体简化自然，追求永恒的形式秩序。",
        keyFeatures: [
          "经过理性分析的色彩，结构化",
          "平行排列的块状笔触，稳定秩序",
          "画面如建筑般坚实稳固",
          "形式优先，用几何体重构自然",
        ],
      },
    ],
    keyDifferences: [
      {
        dimension: "brushstroke",
        dimensionLabel: "笔触",
        description: "梵高：流动的旋涡状，充满能量和动势；塞尚：平行排列的块状笔触，像砌砖一样构建画面。",
      },
      {
        dimension: "composition",
        dimensionLabel: "构图",
        description: "梵高：画面充满动态，空间扭曲为情感服务；塞尚：画面坚实稳固，用圆柱体、球体、锥体重构自然。",
      },
      {
        dimension: "color",
        dimensionLabel: "色彩",
        description: "梵高：主观情绪化的色彩，为表达可超越自然；塞尚：理性分析的色彩，服务于形式结构。",
      },
      {
        dimension: "emotion",
        dimensionLabel: "情感",
        description: "梵高：情感的火焰，炽热而外放；塞尚：形式的秩序，冷静而内敛。",
      },
    ],
    paintingIds: ["1", "12", "13"],
    background: "梵高和塞尚是后印象派最重要的两位代表，都超越了印象派对瞬间光影的捕捉，走向更主观的表达。梵高的道路通向表现主义，塞尚的道路通向立体主义和现代形式主义。塞尚被誉为\"现代艺术之父\"，毕加索曾说\"塞尚是我们所有人的父亲\"。",
  },
];

export function generateCampQuestions(combination: ConfusionCampCombination): ConfusionCampQuestion[] {
  const questions: ConfusionCampQuestion[] = [];
  const relevantPaintings = paintings.filter((p) => combination.paintingIds.includes(p.id));
  const shuffled = shuffle(relevantPaintings);

  shuffled.forEach((painting, index) => {
    const correctItem = combination.items.find(
      (item) => painting.artist.includes(item.label.split("·")[0]) || item.label.includes(painting.artist)
    );
    if (!correctItem) return;

    const allItemLabels = combination.items.map((i) => i.label);
    const options = shuffle(allItemLabels);

    const keyDims = combination.keyDifferences.slice(0, 3).map((d) => d.dimension);

    const primaryDiff = combination.keyDifferences.find((d) => d.dimension === keyDims[0]);
    const confusionExplanation = primaryDiff
      ? `这幅画容易被误判的关键在于「${primaryDiff.dimensionLabel}」：${primaryDiff.description}`
      : "注意观察笔触、色彩和构图的细微差异。";

    questions.push({
      id: `q-${combination.id}-${index}-${Date.now()}`,
      paintingId: painting.id,
      questionType: "artist",
      questionText: "这幅画作的作者是谁？",
      options,
      correctAnswer: correctItem.label,
      correctItemId: correctItem.id,
      confusionExplanation,
      keyDimensions: keyDims,
    });
  });

  return questions.slice(0, Math.min(5, questions.length));
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generateWeaknessQuestions(
  combination: ConfusionCampCombination,
  weakItemIds: string[]
): ConfusionCampQuestion[] {
  const questions = generateCampQuestions(combination);
  const weakQuestions = questions.filter((q) => weakItemIds.includes(q.correctItemId));
  return weakQuestions.length > 0 ? weakQuestions : questions.slice(0, 3);
}

export function analyzeMisjudgments(
  answers: ConfusionCampAnswer[],
  combination: ConfusionCampCombination
): StyleIdentificationReport {
  const totalQuestions = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracy = totalQuestions > 0 ? correctCount / totalQuestions : 0;
  const avgTime =
    totalQuestions > 0 ? answers.reduce((sum, a) => sum + a.timeSpent, 0) / totalQuestions : 0;

  const errorAnswers = answers.filter((a) => !a.isCorrect);
  const patternMap = new Map<string, MisjudgmentPattern>();

  errorAnswers.forEach((answer) => {
    const pair = [answer.correctItemId, answer.selectedItemId].filter(Boolean).sort().join("|");
    if (!pair) return;
    const existing = patternMap.get(pair);
    if (existing) {
      existing.count++;
    } else {
      const [id1, id2] = pair.split("|");
      const item1 = combination.items.find((i) => i.id === id1);
      const item2 = combination.items.find((i) => i.id === id2);
      const relevantDiffs = combination.keyDifferences.filter(
        (d) =>
          d.description.includes(item1?.label.split("·")[0] || "") ||
          d.description.includes(item2?.label.split("·")[0] || "") ||
          true
      );
      patternMap.set(pair, {
        confusedPair: [id1, id2],
        count: 1,
        dimensions: relevantDiffs.slice(0, 2).map((d) => d.dimension),
        description: `多次将「${item1?.label || "?"}」与「${item2?.label || "?"}」混淆`,
        tip: relevantDiffs[0]?.description || "仔细观察关键差异维度。",
      });
    }
  });

  const misjudgmentPatterns = Array.from(patternMap.values()).sort((a, b) => b.count - a.count);

  const dimensionErrors: Record<ConfusionDimension, { total: number; wrong: number }> = {
    color: { total: 0, wrong: 0 },
    brushstroke: { total: 0, wrong: 0 },
    light: { total: 0, wrong: 0 },
    composition: { total: 0, wrong: 0 },
    theme: { total: 0, wrong: 0 },
    emotion: { total: 0, wrong: 0 },
  };

  answers.forEach((answer) => {
    const question = generateCampQuestions(combination).find((q) => q.id === answer.questionId);
    if (!question) return;
    question.keyDimensions.forEach((dim) => {
      dimensionErrors[dim].total++;
      if (!answer.isCorrect) dimensionErrors[dim].wrong++;
    });
  });

  const weakDimensions: { dimension: ConfusionDimension; label: string; errorRate: number }[] = [];
  const strongDimensions: { dimension: ConfusionDimension; label: string; accuracy: number }[] = [];

  (Object.keys(dimensionErrors) as ConfusionDimension[]).forEach((dim) => {
    const { total, wrong } = dimensionErrors[dim];
    if (total > 0) {
      const errorRate = wrong / total;
      const acc = 1 - errorRate;
      if (errorRate >= 0.4) {
        weakDimensions.push({ dimension: dim, label: DIMENSION_LABELS[dim], errorRate });
      }
      if (acc >= 0.8) {
        strongDimensions.push({ dimension: dim, label: DIMENSION_LABELS[dim], accuracy: acc });
      }
    }
  });

  weakDimensions.sort((a, b) => b.errorRate - a.errorRate);
  strongDimensions.sort((a, b) => b.accuracy - a.accuracy);

  let progressMessage = "";
  if (accuracy >= 0.9) progressMessage = "🏆 大师级表现！你已经能精准分辨这些极易混淆的风格了。";
  else if (accuracy >= 0.7) progressMessage = "✨ 优秀！你已经掌握了大部分关键差异，继续巩固薄弱环节。";
  else if (accuracy >= 0.5) progressMessage = "📈 不错的开端！重点突破报告中指出的误判模式，会有显著提升。";
  else progressMessage = "💪 这正是训练的意义！按照报告中的建议反复练习，你会越来越敏锐。";

  const improvementTips: string[] = [];
  if (weakDimensions.length > 0) {
    improvementTips.push(
      `重点关注「${weakDimensions.map((w) => w.label).join("、")}」维度，这是你最容易出错的判断依据。`
    );
  }
  misjudgmentPatterns.slice(0, 2).forEach((p) => {
    improvementTips.push(p.tip);
  });
  if (avgTime > 10000) {
    improvementTips.push("尝试加快判断速度，第一印象往往是最准确的。");
  }
  if (improvementTips.length === 0) {
    improvementTips.push("继续挑战更高难度的混淆组合，挑战更多艺术家组合！");
  }

  return {
    totalQuestions,
    correctCount,
    accuracy,
    averageTimePerQuestion: avgTime,
    misjudgmentPatterns,
    weakDimensions,
    strongDimensions,
    progressMessage,
    improvementTips,
  };
}

export function getAllCampCombinations(): ConfusionCampCombination[] {
  return [...confusionCampCombinations];
}

export function getCampCombinationById(id: string): ConfusionCampCombination | undefined {
  return confusionCampCombinations.find((c) => c.id === id);
}

export type CuratorialTag =
  | "light"
  | "color"
  | "loneliness"
  | "paris"
  | "revolution"
  | "nature"
  | "portrait"
  | "religion"
  | "dream"
  | "love"
  | "suffering"
  | "golden"
  | "geometric"
  | "movement"
  | "water"
  | "night"
  | "warmth"
  | "melancholy";

export const CURATORIAL_TAG_LABELS: Record<CuratorialTag, string> = {
  light: "光影",
  color: "色彩",
  loneliness: "孤独",
  paris: "巴黎",
  revolution: "艺术革命",
  nature: "自然",
  portrait: "肖像",
  religion: "宗教",
  dream: "梦境",
  love: "爱情",
  suffering: "苦难",
  golden: "金色",
  geometric: "几何",
  movement: "动势",
  water: "水",
  night: "夜晚",
  warmth: "温暖",
  melancholy: "忧郁",
};

export interface CuratorialTheme {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  requiredTags: CuratorialTag[];
  recommendedTags: CuratorialTag[];
  minWorks: number;
  maxWorks: number;
  difficulty: "easy" | "normal" | "hard";
  icon: string;
  narrativeHint: string;
}

export const CURATORIAL_THEMES: CuratorialTheme[] = [
  {
    id: "light-and-color",
    title: "光与颜色",
    titleEn: "Light and Color",
    description: "探索印象派与后印象派大师如何捕捉光线的瞬息万变，用色彩奏响视觉交响。",
    requiredTags: ["light", "color"],
    recommendedTags: ["nature", "water", "movement", "warmth"],
    minWorks: 3,
    maxWorks: 6,
    difficulty: "easy",
    icon: "🌅",
    narrativeHint: "从日出到日落，从薄雾到晴空，讲述一场关于光的旅行。",
  },
  {
    id: "lonely-painter",
    title: "孤独的画家",
    titleEn: "The Lonely Painter",
    description: "审视艺术家内心深处的孤独与挣扎，那些在隔绝中绽放的天才之火。",
    requiredTags: ["loneliness", "suffering"],
    recommendedTags: ["melancholy", "night", "portrait"],
    minWorks: 3,
    maxWorks: 5,
    difficulty: "normal",
    icon: "🌙",
    narrativeHint: "每一幅画都是一封写给世界的独白信。",
  },
  {
    id: "paris-revolution",
    title: "巴黎艺术革命",
    titleEn: "Paris Art Revolution",
    description: "19世纪巴黎如何成为现代艺术的摇篮，从印象派到立体主义的浪潮迭起。",
    requiredTags: ["paris", "revolution"],
    recommendedTags: ["color", "geometric", "movement"],
    minWorks: 4,
    maxWorks: 7,
    difficulty: "hard",
    icon: "🗼",
    narrativeHint: "蒙马特的咖啡馆里，一场改变艺术史的革命正在酝酿。",
  },
  {
    id: "dreams-and-mystery",
    title: "梦境与神秘",
    titleEn: "Dreams and Mystery",
    description: "潜入超现实主义与象征主义的潜意识世界，探寻理性之外的真实。",
    requiredTags: ["dream"],
    recommendedTags: ["night", "melancholy", "love", "geometric"],
    minWorks: 3,
    maxWorks: 6,
    difficulty: "normal",
    icon: "🌌",
    narrativeHint: "当沉睡的意识苏醒，画布成为通往另一个世界的入口。",
  },
  {
    id: "golden-era",
    title: "金色时代",
    titleEn: "The Golden Era",
    description: "从文艺复兴到荷兰黄金时代，重温那些人类艺术的辉煌巅峰。",
    requiredTags: ["golden"],
    recommendedTags: ["portrait", "religion", "love"],
    minWorks: 3,
    maxWorks: 5,
    difficulty: "normal",
    icon: "👑",
    narrativeHint: "在金辉与光影交织中，感受那些永恒的艺术瞬间。",
  },
  {
    id: "love-and-tenderness",
    title: "爱与柔情",
    titleEn: "Love and Tenderness",
    description: "从恋人的拥吻到母子的凝视，艺术中最温柔动人的情感表达。",
    requiredTags: ["love"],
    recommendedTags: ["warmth", "portrait", "golden", "nature"],
    minWorks: 3,
    maxWorks: 6,
    difficulty: "easy",
    icon: "💝",
    narrativeHint: "画笔无法描绘爱，却能记录爱存在过的每一个瞬间。",
  },
];

export const PAINTING_CURATORIAL_TAGS: Record<string, CuratorialTag[]> = {
  "1": ["night", "color", "movement", "light", "loneliness", "dream", "melancholy"],
  "2": ["portrait", "golden", "love", "dream"],
  "3": ["light", "color", "water", "paris", "revolution", "nature", "movement"],
  "4": ["suffering", "geometric", "revolution", "paris", "movement"],
  "5": ["portrait", "golden", "love", "light", "melancholy"],
  "6": ["dream", "melancholy", "geometric", "night"],
  "7": ["love", "golden", "warmth", "geometric", "portrait"],
  "8": ["religion", "golden", "movement"],
  "9": ["suffering", "loneliness", "melancholy", "night", "dream", "movement"],
  "10": ["golden", "portrait", "movement", "light"],
  "11": ["water", "light", "color", "nature", "movement"],
};

export interface CuratorialEvaluation {
  totalScore: number;
  themeMatchScore: number;
  diversityScore: number;
  narrativeFlowScore: number;
  styleAnalysis: string[];
  strengths: string[];
  improvements: string[];
  rank: "bronze" | "silver" | "gold" | "master";
  rankTitle: string;
  comment: string;
}

export function getAllCuratorialThemes(): CuratorialTheme[] {
  return [...CURATORIAL_THEMES];
}

export function getCuratorialThemeById(id: string): CuratorialTheme | undefined {
  return CURATORIAL_THEMES.find((t) => t.id === id);
}

export function getPaintingsForCuratorTheme(
  theme: CuratorialTheme,
  excludeIds: string[] = []
): Painting[] {
  const relevantTags = [...theme.requiredTags, ...theme.recommendedTags];
  return paintings
    .filter((p) => {
      if (excludeIds.includes(p.id)) return false;
      const tags = PAINTING_CURATORIAL_TAGS[p.id] || [];
      return tags.some((t) => relevantTags.includes(t));
    })
    .sort((a, b) => {
      const aTags = PAINTING_CURATORIAL_TAGS[a.id] || [];
      const bTags = PAINTING_CURATORIAL_TAGS[b.id] || [];
      const aScore = aTags.filter((t) => relevantTags.includes(t)).length;
      const bScore = bTags.filter((t) => relevantTags.includes(t)).length;
      return bScore - aScore;
    });
}

export function evaluateCuratorialExhibition(
  theme: CuratorialTheme,
  selectedPaintingIds: string[],
  narrativeText: string
): CuratorialEvaluation {
  const selectedPaintings = selectedPaintingIds
    .map((id) => paintings.find((p) => p.id === id))
    .filter(Boolean) as Painting[];

  let themeMatchScore = 0;
  const matchedRequired = new Set<CuratorialTag>();
  const matchedRecommended = new Set<CuratorialTag>();

  selectedPaintings.forEach((painting) => {
    const tags = PAINTING_CURATORIAL_TAGS[painting.id] || [];
    theme.requiredTags.forEach((t) => {
      if (tags.includes(t)) matchedRequired.add(t);
    });
    theme.recommendedTags.forEach((t) => {
      if (tags.includes(t)) matchedRecommended.add(t);
    });
  });

  themeMatchScore = Math.round(
    (matchedRequired.size / theme.requiredTags.length) * 60 +
      (matchedRecommended.size / Math.max(theme.recommendedTags.length, 1)) * 25
  );

  const movements = new Set(selectedPaintings.map((p) => p.movement));
  const artists = new Set(selectedPaintings.map((p) => p.artist));
  const decades = new Set(selectedPaintings.map((p) => p.decade));
  const diversityScore = Math.round(
    (Math.min(movements.size, 4) / 4) * 30 +
      (Math.min(artists.size, 5) / 5) * 35 +
      (Math.min(decades.size, 4) / 4) * 35
  );

  let narrativeFlowScore = 15;
  if (narrativeText.trim().length > 20) narrativeFlowScore += 15;
  if (narrativeText.trim().length > 60) narrativeFlowScore += 15;
  if (narrativeText.trim().length > 120) narrativeFlowScore += 15;
  narrativeFlowScore = Math.min(narrativeFlowScore, 60);

  if (selectedPaintings.length >= theme.minWorks) narrativeFlowScore += 10;
  if (selectedPaintings.length >= theme.minWorks + 1) narrativeFlowScore += 10;

  const totalScore = Math.round(
    themeMatchScore * 0.45 + diversityScore * 0.3 + narrativeFlowScore * 0.25
  );

  const styleAnalysis: string[] = [];
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (movements.size >= 3) {
    strengths.push(`跨越 ${movements.size} 个艺术流派，展现了开阔的艺术视野`);
    styleAnalysis.push(
      `展览涵盖 ${Array.from(movements).join("、")} 等多种风格，形成了丰富的风格对话`
    );
  } else {
    improvements.push("可以尝试选择更多不同艺术流派的作品，增加风格多样性");
  }

  if (artists.size >= 3) {
    strengths.push(`汇集 ${artists.size} 位艺术家的作品，策展选择丰富多元`);
  } else {
    improvements.push("尝试引入更多不同艺术家的作品，让策展视角更丰富");
  }

  if (matchedRequired.size === theme.requiredTags.length) {
    strengths.push("完美契合主题的所有核心要素");
  } else if (matchedRequired.size >= theme.requiredTags.length * 0.5) {
    strengths.push("较好地把握了主题的核心精神");
  } else {
    improvements.push(`部分核心主题标签尚未覆盖，建议增加与主题更直接相关的作品`);
  }

  if (matchedRecommended.size >= theme.recommendedTags.length * 0.6) {
    strengths.push("成功融入了多个推荐主题元素，展览层次丰富");
  }

  if (selectedPaintings.length >= theme.minWorks + 1) {
    strengths.push(`展出 ${selectedPaintings.length} 幅作品，体量充足`);
  }

  if (narrativeText.trim().length > 80) {
    strengths.push("策展说明详尽，叙事性强");
  } else if (narrativeText.trim().length > 0) {
    improvements.push("策展说明可以更详尽一些，讲述展览背后的故事");
  } else {
    improvements.push("别忘了为你的展览撰写一段策展说明");
  }

  let rank: CuratorialEvaluation["rank"] = "bronze";
  let rankTitle = "新晋策展人";
  if (totalScore >= 90) {
    rank = "master";
    rankTitle = "策展大师";
  } else if (totalScore >= 75) {
    rank = "gold";
    rankTitle = "金牌策展人";
  } else if (totalScore >= 55) {
    rank = "silver";
    rankTitle = "银牌策展人";
  }

  const comments: Record<CuratorialEvaluation["rank"], string> = {
    bronze: "作为策展新人，你已经迈出了重要的第一步。继续探索艺术的世界，你的策展眼光会越来越独特。",
    silver: "不错的策展尝试！你已经掌握了基本的策展逻辑，在主题契合和作品选择上展现了良好的感觉。",
    gold: "出色的策展！你的展览兼具主题深度与视觉丰富度，展现了成熟的艺术判断力和叙事能力。",
    master: "大师级的策展！这场展览堪称专业水准，主题表达精准、作品搭配精妙、叙事引人入胜。你就是天生的策展人！",
  };

  return {
    totalScore,
    themeMatchScore,
    diversityScore,
    narrativeFlowScore,
    styleAnalysis,
    strengths,
    improvements,
    rank,
    rankTitle,
    comment: comments[rank],
  };
}
