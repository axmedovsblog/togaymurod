export interface TilBirligi {
  id: number
  til_birligi: string
  turi: string
  semantik_maʼno: string
  badiiy_funksiyasi: string
}

export interface AsarData {
  [asarNomi: string]: TilBirligi[]
}

export const annotatedData: AsarData = {
  "Yulduzlar mangu yonadi": [
    { id: 1, til_birligi: "Mehmonlar qora berdi", turi: "ibora", semantik_maʼno: "Ko`rinmoq", badiiy_funksiyasi: "To`y boshlanib mehmonlarning birin-ketin kelishi" },
    { id: 2, til_birligi: "Elning so`zini tashlamoq", turi: "ibora", semantik_maʼno: "Atrofga quloq solmaslik", badiiy_funksiyasi: "Xalqning qadr qimmati har bir inson uchun yuqori o`rinda turishi kerakligiga ishora qiladi" },
    { id: 3, til_birligi: "El yuz soldi", turi: "Ibora", semantik_maʼno: "Ishonch bildirdi", badiiy_funksiyasi: "Qahramonga nisbatan kuchli ishonch" },
    { id: 4, til_birligi: "Sariosiyoni mom qildi", turi: "Ibora", semantik_maʼno: "Mot qildi", badiiy_funksiyasi: "Sheva elementidan foydalanilgan yutdi yoki changida qoldirdi maʼnosida" },
    { id: 5, til_birligi: "Yuzidan qon tomadi", turi: "Ibora", semantik_maʼno: "Istarali va yosh", badiiy_funksiyasi: "Qarilikni tan olmagan qahramonning o`ziga bergan bahosi" },
    { id: 6, til_birligi: "Egachim elakli bo`ldi, elagi tilakli bo`ldi", turi: "Xalq maqoli", semantik_maʼno: "biror ish yoki holat kutilganidek yaxshi chiqmadi", badiiy_funksiyasi: "Umidsizlik ma`nosida" },
    { id: 7, til_birligi: "Betini murdashuy ko`rsin", turi: "Qarg`ish so`z", semantik_maʼno: "Yuzini o`lik yuvuvchi ko`rsin", badiiy_funksiyasi: "Kuchli nafrat va alam" },
    { id: 8, til_birligi: "Xalq hukmi -haq hukmi", turi: "Ibora", semantik_maʼno: "Xalqning aytgani bo`lishi aniq va muqarrar, undan bosh tortib bo`lmaydi", badiiy_funksiyasi: "Xalq roziligi hamma narsadan ustunligi izohlangan" },
    { id: 9, til_birligi: "Qizbet", turi: "O`xshatish", semantik_maʼno: "Ayolsifat", badiiy_funksiyasi: "Xiyonatkor do`stiga nisbatan qahramonning nafratini ochiqlagan" },
    { id: 10, til_birligi: "Oh- yurakdan, yosh- ko`zdan", turi: "O`xshatish", semantik_maʼno: "haqiqiy azobni, samimiy ko`z yoshini ifodalaydi", badiiy_funksiyasi: "Qahramonning sevgidan ayrilganidagi iztirobini ko`rsatadi" },
    { id: 11, til_birligi: "Laylakning yurishini qilaman deb chumchuqning buti yirtilibdi", turi: "Maqol", semantik_maʼno: "Qo`lidan kelmaydigan ishga chiranmoq", badiiy_funksiyasi: "Qahramondagi kibr tufayli boshqalarga yetarli baho bermaslik" },
    { id: 12, til_birligi: "Xudodan no`xtasini yulgan", turi: "Ibora o`xshatish", semantik_maʼno: "Xudoning o`zi bergan jilovni ham yulib tashlagan, o`zi bilganidan qolmaydigan", badiiy_funksiyasi: "Salbiy qahramonga nisbatan berilgan o`xshatish" },
    { id: 13, til_birligi: "o`lim qosh bilan qaboq orasida bo`ladi", turi: "ibora", semantik_maʼno: "hayotning qisqaligi, o`limning yaqinligidir", badiiy_funksiyasi: "Qahramon Bo`ri polvonning to`satdan onasidan ayrilganini ifodalagan" },
  ],
  "Ot kishnagan oqshom": [
    { id: 1, til_birligi: "Yara-chaqalar uch berdi", turi: "Frazeologizm", semantik_maʼno: "Insonlar ko`cha-ko`yda ko`rina boshladi", badiiy_funksiyasi: "Katta-kichik birdek ko`rinmoq" },
    { id: 2, til_birligi: "Sag'risiga uy tiksa bo'ladigan baytallar", turi: "Metafora", semantik_maʼno: "Juda kuchli, bardoshli, chidamli ot", badiiy_funksiyasi: "ot obrazini badiiyat orqali kuchli tasvirlash" },
    { id: 3, til_birligi: "Temirning yuragi yo'q", turi: "Metafora", semantik_maʼno: "Rahmsiz, shafqatsiz, tosh qalb", badiiy_funksiyasi: "Qalb qattiqligini ifodalash" },
    { id: 4, til_birligi: "Kalning nimasi bor, temir tarog'i bor", turi: "Maqol", semantik_maʼno: "Ichki kechinmalar va qalb hammada birdek", badiiy_funksiyasi: "Tashqi ko`rinish har doim ham insonlar haqida haqiqatni yuzaga chiqarmaydi" },
    { id: 5, til_birligi: "Ot usti behisht, og'zi do'zah", turi: "Maqol", semantik_maʼno: "Ot minish — zavq, lekin uning og`zidagi abzallari otni qanchalik qiynashi", badiiy_funksiyasi: "Hayotning ikki tomonini ko`rsatish" },
    { id: 6, til_birligi: "Otga minsang — boshungni o'yla, erga tushsang — otingni o'yla", turi: "Maqol", semantik_maʼno: "Har qanday holatda ham ehtiyot bo`lish kerak", badiiy_funksiyasi: "Mas’uliyat va ogohlik" },
    { id: 7, til_birligi: "Odam so'zlashib topishadi, yilki kishnashib topishadi", turi: "Maqol", semantik_maʼno: "Har kim o`z tilida, o`z usulida kelishadi", badiiy_funksiyasi: "Inson va hayvon qiyoslanishi" },
    { id: 8, til_birligi: "Oshingni esa-da mard esin, boshungni esa-da mard esin", turi: "Maqol", semantik_maʼno: "Mard inson hechqachon boshqalarga zarar yetkazadigan ish qilmaydi", badiiy_funksiyasi: "Mardlikning ulug`lanishi" },
    { id: 9, til_birligi: "Eshak yiqitsa, tuyog'ini to'shaydi, ot yiqitsa, yolini to'shaydi", turi: "Xalq iborasi", semantik_maʼno: "Ot insonga yaqin do`st qatorida", badiiy_funksiyasi: "Otning fazilati" },
    { id: 10, til_birligi: "Haqqa saqlasa balo yo'q, haqqa qarg'asa davo yo'q", turi: "Maqol", semantik_maʼno: "Taqdiri azalga rozilik", badiiy_funksiyasi: "Haqqa ishonish" },
    { id: 11, til_birligi: "Yomondan qoch-da kutul, yo, ton-da kutul", turi: "Maqol", semantik_maʼno: "Yomondan uzoqroq bo`lish kerak", badiiy_funksiyasi: "Ehtiyotkorlik va ogohlik darkor" },
    { id: 12, til_birligi: "O'zbek eli o'r keladi, o'zi o'jgar, zor keladi", turi: "Xalq iborasi", semantik_maʼno: "O`zbek xalqiga xos xususiyatni ifodalash", badiiy_funksiyasi: "Milliy o`zlik va g`ururni ifodalash" },
    { id: 13, til_birligi: "Qish qaridi", turi: "Muallifga xos metafora", semantik_maʼno: "Qish oxiriga yetdi, vaqt o`tdi", badiiy_funksiyasi: "Vaqt o`tishini obrazli ifodalash" },
    { id: 14, til_birligi: "Koklam kayfiyati qish bo'ldi", turi: "Muallifga xos metafora", semantik_maʼno: "Ichki quvonch buzulib o`rnini qayg`u egalladi", badiiy_funksiyasi: "Inson kechinmalarining o`zgarishini tasvirlash" },
    { id: 15, til_birligi: "Koklam rangim sindi", turi: "Muallifga xos metafora", semantik_maʼno: "Ichki holatim buzildi, rangim o`chdi", badiiy_funksiyasi: "Ruhiy tushkunlikni ifodalash" },
    { id: 18, til_birligi: "Nasib etsa, kelar Shom-u Iroqdan, nasib bitsa, ketar qosh-u qaboqdan", turi: "Xalq iborasi", semantik_maʼno: "Nasiba seniki bo`lsa hamma joydan keladi aksincha bo`lsa taqdirga ko`nishdan boshqa chora yo`q", badiiy_funksiyasi: "Taqdir va nasib mavzusi" },
    { id: 19, til_birligi: "Davlat-da egiz-egiz, mehnat-da egiz-egiz!", turi: "Maqol", semantik_maʼno: "Boylik ham, mehnat ham juft bo`ladi", badiiy_funksiyasi: "Mehnat va boylik muvozanati" },
    { id: 20, til_birligi: "Osmonidan telpak tashlasa erga tushmadi", turi: "Frazeologizm", semantik_maʼno: "Juda baland, erishib bo`lmaydigan narsa", badiiy_funksiyasi: "Imkonsiz narsani ifodalash" },
    { id: 21, til_birligi: "Yigitlik g'ururi varaja qildi", turi: "Muallifga xos metafora", semantik_maʼno: "Yigitlik g`ururi o`zini ko`rsatdi", badiiy_funksiyasi: "Yigitlik sha’nini tasvirlash" },
    { id: 22, til_birligi: "Boydoqning aqli ikki ko'zida bo'ladi", turi: "Xalq iborasi", semantik_maʼno: "Bo`ydoq yigitning aqli ko`zida (ayollarga qarashda)", badiiy_funksiyasi: "Kinoya va hazil" },
    { id: 23, til_birligi: "Yigitning boshi ikkita bo'lmagunicha, moli ikkita bo'lmaydi", turi: "Maqol", semantik_maʼno: "Yigitlar oila qursa nasibasi ziyoda bo`lib, ishida unum bo`ladi.(o`zbek xalqi an`analari asosida)", badiiy_funksiyasi: "Oilaviy va moddiy mavzu" },
    { id: 24, til_birligi: "Osmon yuzi pokiza bo'ldi", turi: "Muallifga xos metafora", semantik_maʼno: "Osmon toza, musaffo bo`ldi", badiiy_funksiyasi: "Tabiatni badiiy tasvirlash" },
    { id: 25, til_birligi: "Boshimizda kun yondi", turi: "Muallifga xos metafora", semantik_maʼno: "Quyosh qizitib kun isishi", badiiy_funksiyasi: "Tabiatni badiiy tasvirlash" },
    { id: 26, til_birligi: "Kal o'zini ovutar — qo'ltig'ini sovutar", turi: "Maqol", semantik_maʼno: "Inson o`z xato va kamchiligini anglamasligi", badiiy_funksiyasi: "Hayot haqiqati" },
    { id: 27, til_birligi: "Yomon gap raketadan oldin yuradi, yaxshi gap toshbaqadan keyin yuradi", turi: "Muallifga xos til birligi", semantik_maʼno: "Yomon xabar tez, yaxshi xabar sekin tarqaladi", badiiy_funksiyasi: "Ijtimoiy kuzatish" },
  ]
}
