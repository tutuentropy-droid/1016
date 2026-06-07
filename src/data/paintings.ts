export interface Painting {
  id: string;
  title: string;
  titleEn: string;
  artist: string;
  year: string;
  movement: string;
  imageUrl: string;
  description: string;
}

export const paintings: Painting[] = [
  {
    id: "1",
    title: "星月夜",
    titleEn: "The Starry Night",
    artist: "文森特·梵高",
    year: "1889",
    movement: "后印象派",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    description: "梵高在法国圣雷米精神病院期间创作，以旋涡状的笔触描绘夜空中闪烁的星辰与明月，被认为是西方艺术史上最知名的画作之一。",
  },
  {
    id: "2",
    title: "蒙娜丽莎",
    titleEn: "Mona Lisa",
    artist: "列奥纳多·达·芬奇",
    year: "1503-1519",
    movement: "文艺复兴盛期",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    description: "以神秘的微笑和精湛的晕涂法闻名于世，是卢浮宫最珍贵的馆藏，描绘了佛罗伦萨商人之妻丽莎·盖拉尔迪尼的肖像。",
  },
  {
    id: "3",
    title: "日出·印象",
    titleEn: "Impression, Sunrise",
    artist: "克劳德·莫奈",
    year: "1872",
    movement: "印象派",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg",
    description: "这幅画在1874年首届印象派展览上亮相，其标题被评论家借用嘲讽整个画派，从而诞生了\"印象派\"这一名称。",
  },
  {
    id: "4",
    title: "格尔尼卡",
    titleEn: "Guernica",
    artist: "巴勃罗·毕加索",
    year: "1937",
    movement: "立体主义",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/PicassoGuernica.jpg/1280px-PicassoGuernica.jpg",
    description: "毕加索为1937年巴黎世博会西班牙馆创作，以立体主义手法描绘了西班牙内战中格尔尼卡小镇被轰炸后的惨状。",
  },
  {
    id: "5",
    title: "戴珍珠耳环的少女",
    titleEn: "Girl with a Pearl Earring",
    artist: "约翰内斯·维米尔",
    year: "约1665",
    movement: "荷兰黄金时代",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
    description: "被誉为\"北方的蒙娜丽莎\"，以少女回眸的姿态和蓝色头巾与珍珠耳环的对比闻名，现藏于荷兰莫瑞泰斯皇家美术馆。",
  },
  {
    id: "6",
    title: "记忆的永恒",
    titleEn: "The Persistence of Memory",
    artist: "萨尔瓦多·达利",
    year: "1931",
    movement: "超现实主义",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/The_Persistence_of_Memory.jpg/1024px-The_Persistence_of_Memory.jpg",
    description: "超现实主义代表作，画面中软塌塌的时钟成为标志性意象，象征着时间的主观性和梦境般的荒诞感。",
  },
  {
    id: "7",
    title: "吻",
    titleEn: "The Kiss",
    artist: "古斯塔夫·克里姆特",
    year: "1907-1908",
    movement: "新艺术运动 / 维也纳分离派",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1024px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    description: "克里姆特金色时期的巅峰之作，大量使用金箔装饰，描绘了相拥亲吻的恋人，是维也纳分离派最具代表性的作品。",
  },
  {
    id: "8",
    title: "创造亚当",
    titleEn: "The Creation of Adam",
    artist: "米开朗基罗",
    year: "约1512",
    movement: "文艺复兴盛期",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
    description: "梵蒂冈西斯廷教堂天顶画的一部分，描绘了《圣经·创世纪》中上帝赋予亚当生命的瞬间，两指间的留白成为艺术史上的经典。",
  },
  {
    id: "9",
    title: "呐喊",
    titleEn: "The Scream",
    artist: "爱德华·蒙克",
    year: "1893",
    movement: "表现主义",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    description: "表现主义的先驱之作，描绘了一个人在血红色天空下发出发自肺腑的尖叫，传达了深刻的焦虑与存在之苦。",
  },
  {
    id: "10",
    title: "夜巡",
    titleEn: "The Night Watch",
    artist: "伦勃朗",
    year: "1642",
    movement: "荷兰黄金时代",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Rembrandt_van_Rijn_197.jpg/1280px-Rembrandt_van_Rijn_197.jpg",
    description: "伦勃朗最著名的群像画，描绘了阿姆斯特丹民兵队出发执行任务的场景，以戏剧性的光影处理和生动的人物动态著称。",
  },
  {
    id: "11",
    title: "睡莲",
    titleEn: "Water Lilies",
    artist: "克劳德·莫奈",
    year: "1906",
    movement: "印象派",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Claude_Monet_-_Water_Lilies_-_1906%2C_66.jpg/1280px-Claude_Monet_-_Water_Lilies_-_1906%2C_66.jpg",
    description: "莫奈在吉维尼花园的睡莲池边创作的系列作品之一，晚年近乎失明状态下仍坚持创作，成为印象派最具标志性的系列。",
  },
  {
    id: "12",
    title: "向日葵",
    titleEn: "Sunflowers",
    artist: "文森特·梵高",
    year: "1888",
    movement: "后印象派",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg/800px-Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
    description: "梵高在阿尔勒时期为好友高更的房间创作，以浓烈的黄色调表达热情与生命力，是他最受人喜爱的系列作品。",
  },
];

export const allArtists = Array.from(new Set(paintings.map(p => p.artist)));
