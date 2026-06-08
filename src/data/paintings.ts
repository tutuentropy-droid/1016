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
