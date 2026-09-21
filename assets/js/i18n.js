/**
 * SkySoft Weather - Internationalization (i18n)
 * Supports English (en), Malay (ms), Chinese (zh), and Japanese (ja).
 */

const I18N = {
    currentLang: 'en',
    supported: ['en', 'ms', 'zh', 'ja'],

    dictionaries: {
        en: {
            appName: 'SkySoft Weather',
            appTagline: 'Global Forecast',
            searchPlaceholder: 'Search city (e.g. Kuala Lumpur, Tokyo, London)...',
            quickLabel: 'Popular:',
            favoritesBtn: 'Favorites',
            historyBtn: 'Recent Searches',
            manualBtn: 'User Manual',
            installBtn: 'Install App',
            closeBtn: 'Close',
            clearBtn: 'Clear All',
            emptyFavorites: 'No favorite cities added yet. Click the heart icon on any city card to save it!',
            emptyHistory: 'No recent searches recorded yet.',
            databaseOfflineNotice: 'Database offline. Using local storage fallback.',
            
            // Weather labels
            feelsLike: 'Feels like',
            humidity: 'Humidity',
            windSpeed: 'Wind Speed',
            windDirection: 'Direction',
            pressure: 'Pressure',
            sunrise: 'Sunrise',
            sunset: 'Sunset',
            localTime: 'Local Time',
            today: 'Today',
            tomorrow: 'Tomorrow',
            high: 'H',
            low: 'L',
            
            // Headings
            hourlyTitle: 'Hourly Forecast (24 Hours)',
            dailyTitle: '7-Day Forecast',
            countryTitle: 'Country A–Z Directory',
            countrySubtitle: 'Browse sovereign countries and explore capital weather instantly',
            selectLetter: 'Select a letter:',
            noCountriesForLetter: 'No countries found starting with letter',
            loadingCountries: 'Loading countries...',

            // Hierarchical Location Explorer
            explorerTitle: 'Regional Explorer: Country → State → City',
            explorerSubtitle: 'Select a country to view capital weather, then select a state and city',
            stepCountry: 'Step 1: Country',
            selectCountryPrompt: 'Select Country (Capital Weather)...',
            stepState: 'Step 2: State / Province',
            selectStatePrompt: 'Select State / Province...',
            selectStateFirst: 'Select a country first',
            stepCity: 'Step 3: City',
            selectCityPrompt: 'Select City...',
            selectCityFirst: 'Select a state first',
            resetExplorer: 'Reset Filters',
            loadingStates: 'Loading states...',
            loadingCities: 'Loading cities...',

            // Errors
            errorWeather: 'Unable to load weather information. Please try again.',
            errorSearch: 'Unable to search cities. Please try again.',
            noCityFound: 'No matching cities found. Check your spelling and try again.',

            // User Manual
            manualTitle: 'User Manual & Guide',
            manualSubtitle: 'Everything you need to navigate SkySoft Weather smoothly',
            manualEscHint: 'Press ESC or click outside to close',
            manualSearchTitle: '1. How to search for a city',
            manualSearchDesc: 'Type a city name in the top search bar (e.g. "Kuala Lumpur" or "Tokyo"). Select a suggested city from the dropdown to view its real-time weather.',
            manualWeatherTitle: '2. How to view weather',
            manualWeatherDesc: 'View live temperature, feels-like temperature, humidity, wind speed/direction, surface pressure, and sunrise/sunset. Scroll horizontally for the 24-hour forecast, and check the 7-day outlook below.',
            manualCountryTitle: '3. How to use Country A–Z',
            manualCountryDesc: 'Click any alphabet letter from A to Z in the Country Browser section to view countries beginning with that letter. Click any country card to immediately load weather for its capital city.',
            manualFavTitle: '4. How to use Favorites & History',
            manualFavDesc: 'Click the heart icon on the hero weather card to add or remove the city from your favorites. Access saved favorites anytime using the "Favorites" button in the top navigation bar.',
            manualLangTitle: '5. How to change language',
            manualLangDesc: 'Use the language dropdown at the top right to switch between English, Malay (Bahasa Melayu), Chinese (简体中文), and Japanese (日本語). Your choice is saved automatically.',

            // Compass
            compass: {
                N: 'N', NNE: 'NNE', NE: 'NE', ENE: 'ENE',
                E: 'E', ESE: 'ESE', SE: 'SE', SSE: 'SSE',
                S: 'S', SSW: 'SSW', SW: 'SW', WSW: 'WSW',
                W: 'W', WNW: 'WNW', NW: 'NW', NNW: 'NNW'
            },

            // Days
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

            // WMO Weather Codes
            conditions: {
                0: 'Clear sky',
                1: 'Mainly clear',
                2: 'Partly cloudy',
                3: 'Overcast',
                45: 'Fog',
                48: 'Depositing rime fog',
                51: 'Light drizzle',
                53: 'Moderate drizzle',
                55: 'Dense drizzle',
                56: 'Light freezing drizzle',
                57: 'Dense freezing drizzle',
                61: 'Slight rain',
                63: 'Moderate rain',
                65: 'Heavy rain',
                66: 'Light freezing rain',
                67: 'Heavy freezing rain',
                71: 'Slight snow fall',
                73: 'Moderate snow fall',
                75: 'Heavy snow fall',
                77: 'Snow grains',
                80: 'Slight rain showers',
                81: 'Moderate rain showers',
                82: 'Violent rain showers',
                85: 'Slight snow showers',
                86: 'Heavy snow showers',
                95: 'Thunderstorm',
                96: 'Thunderstorm with slight hail',
                99: 'Thunderstorm with heavy hail'
            }
        },

        ms: {
            appName: 'SkySoft Weather',
            appTagline: 'Ramalan Cuaca Global',
            searchPlaceholder: 'Cari bandar (cth. Kuala Lumpur, Pulau Pinang, Tokyo)...',
            quickLabel: 'Popular:',
            favoritesBtn: 'Kegemaran',
            historyBtn: 'Carian Terkini',
            manualBtn: 'Panduan Pengguna',
            installBtn: 'Pasang Aplikasi',
            closeBtn: 'Tutup',
            clearBtn: 'Kosongkan Semua',
            emptyFavorites: 'Tiada bandar kegemaran disimpan lagi. Klik ikon hati pada mana-mana bandar untuk menyimpannya!',
            emptyHistory: 'Tiada sejarah carian direkodkan lagi.',
            databaseOfflineNotice: 'Pangkalan data luar talian. Menggunakan simpanan tempatan peranti.',

            // Weather labels
            feelsLike: 'Terasa seperti',
            humidity: 'Kelembapan',
            windSpeed: 'Kelajuan Angin',
            windDirection: 'Arah Angin',
            pressure: 'Tekanan Udara',
            sunrise: 'Matahari Terbit',
            sunset: 'Matahari Terbenam',
            localTime: 'Waktu Tempatan',
            today: 'Hari Ini',
            tomorrow: 'Esok',
            high: 'Tinggi',
            low: 'Rendah',

            // Headings
            hourlyTitle: 'Ramalan Mengikut Jam (24 Jam)',
            dailyTitle: 'Ramalan 7 Hari',
            countryTitle: 'Direktori Negara A–Z',
            countrySubtitle: 'Layari negara di seluruh dunia dan terokai cuaca ibu kota secara langsung',
            selectLetter: 'Pilih huruf:',
            noCountriesForLetter: 'Tiada negara ditemui bermula dengan huruf',
            loadingCountries: 'Memuatkan senarai negara...',

            // Hierarchical Location Explorer
            explorerTitle: 'Penjelajah Wilayah: Negara → Negeri → Bandar',
            explorerSubtitle: 'Pilih negara untuk melihat cuaca ibu kota, kemudian pilih negeri dan bandar',
            stepCountry: 'Langkah 1: Negara',
            selectCountryPrompt: 'Pilih Negara (Cuaca Ibu Kota)...',
            stepState: 'Langkah 2: Negeri / Wilayah',
            selectStatePrompt: 'Pilih Negeri / Wilayah...',
            selectStateFirst: 'Pilih negara dahulu',
            stepCity: 'Langkah 3: Bandar',
            selectCityPrompt: 'Pilih Bandar...',
            selectCityFirst: 'Pilih negeri dahulu',
            resetExplorer: 'Set Semula',
            loadingStates: 'Memuatkan negeri...',
            loadingCities: 'Memuatkan bandar...',

            // Errors
            errorWeather: 'Tidak dapat memuatkan maklumat cuaca. Sila cuba lagi.',
            errorSearch: 'Tidak dapat mencari bandar. Sila cuba lagi.',
            noCityFound: 'Tiada bandar ditemui sepadan dengan carian anda. Sila semak ejaan.',

            // User Manual
            manualTitle: 'Panduan & Manual Pengguna',
            manualSubtitle: 'Semua maklumat untuk menggunakan laman SkySoft Weather',
            manualEscHint: 'Tekan ESC atau klik di luar untuk menutup',
            manualSearchTitle: '1. Cara mencari bandar',
            manualSearchDesc: 'Taip nama bandar dalam kotak carian di bahagian atas (cth. "Kuala Lumpur" atau "Tokyo"). Pilih daripada cadangan untuk melihat cuaca.',
            manualWeatherTitle: '2. Cara melihat maklumat cuaca',
            manualWeatherDesc: 'Lihat suhu semasa, suhu yang dirasakan, kelembapan, kelajuan angin, tekanan udara, serta waktu matahari terbit dan terbenam. Tatal ke sisi untuk melihat ramalan 24 jam.',
            manualCountryTitle: '3. Cara menggunakan Negara A–Z',
            manualCountryDesc: 'Klik mana-mana huruf abjad dari A hingga Z dalam seksyen direktori negara untuk melihat negara. Klik kad negara untuk melihat cuaca ibu kotanya serta-merta.',
            manualFavTitle: '4. Cara menggunakan Kegemaran & Sejarah',
            manualFavDesc: 'Klik ikon hati pada kad cuaca utama untuk menambah atau memadam bandar daripada kegemaran. Akses senarai kegemaran melalui butang di navigasi atas.',
            manualLangTitle: '5. Cara menukar bahasa',
            manualLangDesc: 'Gunakan menu pilihan bahasa di sudut kanan atas untuk bertukar antara Bahasa Inggeris, Bahasa Melayu, Bahasa Cina, dan Bahasa Jepun.',

            // Compass
            compass: {
                N: 'U', NNE: 'U-TL', NE: 'TL', ENE: 'T-TL',
                E: 'T', ESE: 'T-TG', SE: 'TG', SSE: 'S-TG',
                S: 'S', SSW: 'S-BD', SW: 'BD', WSW: 'B-BD',
                W: 'B', WNW: 'B-BL', NW: 'BL', NNW: 'U-BL'
            },

            // Days
            days: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
            daysShort: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],

            // WMO Weather Codes
            conditions: {
                0: 'Langit cerah',
                1: 'Sebahagian cerah',
                2: 'Sebahagian mendung',
                3: 'Mendung',
                45: 'Kabus',
                48: 'Kabus tebal berfros',
                51: 'Hujan rintik-rintik ringan',
                53: 'Hujan rintik-rintik sederhana',
                55: 'Hujan rintik-rintik lebat',
                56: 'Hujan rintik membeku ringan',
                57: 'Hujan rintik membeku lebat',
                61: 'Hujan ringan',
                63: 'Hujan sederhana',
                65: 'Hujan lebat',
                66: 'Hujan membeku ringan',
                67: 'Hujan membeku lebat',
                71: 'Salji ringan',
                73: 'Salji sederhana',
                75: 'Salji lebat',
                77: 'Butiran salji',
                80: 'Hujan panas ringan',
                81: 'Hujan lebat sekejap',
                82: 'Hujan ribut sangat lebat',
                85: 'Hujan salji ringan',
                86: 'Hujan salji lebat',
                95: 'Ribut petir',
                96: 'Ribut petir berserta hujan batu ringan',
                99: 'Ribut petir berserta hujan batu lebat'
            }
        },

        zh: {
            appName: 'SkySoft 天气',
            appTagline: '全球气象预测',
            searchPlaceholder: '搜索城市（例如：吉隆坡、北京、东京、伦敦）...',
            quickLabel: '热门城市：',
            favoritesBtn: '收藏城市',
            historyBtn: '搜索历史',
            manualBtn: '使用手册',
            installBtn: '安装应用',
            closeBtn: '关闭',
            clearBtn: '清空全部',
            emptyFavorites: '暂无收藏城市。点击天气卡片上的爱心图标即可收藏！',
            emptyHistory: '暂无搜索历史记录。',
            databaseOfflineNotice: '数据库离线，正在使用本地浏览器存储。',

            // Weather labels
            feelsLike: '体感温度',
            humidity: '空气湿度',
            windSpeed: '风速',
            windDirection: '风向',
            pressure: '气压',
            sunrise: '日出时间',
            sunset: '日落时间',
            localTime: '当地时间',
            today: '今天',
            tomorrow: '明天',
            high: '最高',
            low: '最低',

            // Headings
            hourlyTitle: '24小时逐时天气预报',
            dailyTitle: '未来7天天气预报',
            countryTitle: 'A–Z 全球国家与地区导航',
            countrySubtitle: '按字母索引浏览全球国家，即刻查看其首都天气预报',
            selectLetter: '选择首字母：',
            noCountriesForLetter: '没有找到以此字母开头的国家：',
            loadingCountries: '正在加载国家列表...',

            // Hierarchical Location Explorer
            explorerTitle: '区域探索器：国家 → 州/省 → 城市',
            explorerSubtitle: '选择国家查看首都天气，然后选择州/省并选择城市',
            stepCountry: '步骤 1：国家',
            selectCountryPrompt: '选择国家（查看首都天气）...',
            stepState: '步骤 2：州 / 省份',
            selectStatePrompt: '选择州 / 省份...',
            selectStateFirst: '请先选择国家',
            stepCity: '步骤 3：城市',
            selectCityPrompt: '选择城市...',
            selectCityFirst: '请先选择州/省',
            resetExplorer: '重置筛选',
            loadingStates: '正在加载省/州...',
            loadingCities: '正在加载城市...',

            // Errors
            errorWeather: '无法加载天气数据，请稍后重试。',
            errorSearch: '城市搜索失败，请重试。',
            noCityFound: '未找到符合条件的城市，请核对名称拼写。',

            // User Manual
            manualTitle: '用户使用手册与指南',
            manualSubtitle: '快速掌握 SkySoft Weather 天气网站的使用技巧',
            manualEscHint: '按 ESC 键或点击外部即可关闭',
            manualSearchTitle: '1. 如何搜索城市',
            manualSearchDesc: '在顶部搜索栏输入城市名称（支持英文字母输入，如 "Kuala Lumpur"、"Tokyo" 或 "London"）。从下拉建议中选择目标城市即可查看实时天气。',
            manualWeatherTitle: '2. 如何查看天气信息',
            manualWeatherDesc: '主卡片展示当前实时温度、体感温度、天气状况、湿度、风向与风速、气压及日出日落。横向滑动即可查看未来24小时预报，下方展示7天趋势。',
            manualCountryTitle: '3. 如何使用国家 A–Z 索引',
            manualCountryDesc: '点击 A 到 Z 任一字母按钮，即可筛选以此字母开头的国家。点击卡片可立即查询该国首都的最新天气。',
            manualFavTitle: '4. 如何使用收藏与历史',
            manualFavDesc: '点击天气主卡片上的爱心图标即可收藏或取消收藏该城市。通过顶部导航栏的“收藏”和“历史”按钮随时调出并快速切换。',
            manualLangTitle: '5. 如何切换语言',
            manualLangDesc: '在右上角的语言选择器中自由切换英语、马来语、简体中文和日语。系统会自动保存您的语言偏好。',

            // Compass
            compass: {
                N: '北', NNE: '北微东北', NE: '东北', ENE: '东微东北',
                E: '东', ESE: '东微东南', SE: '东南', SSE: '南微东南',
                S: '南', SSW: '南微西南', SW: '西南', WSW: '西微西南',
                W: '西', WNW: '西微西北', NW: '西北', NNW: '北微西北'
            },

            // Days
            days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],

            // WMO Weather Codes
            conditions: {
                0: '晴空万里',
                1: '大部分晴朗',
                2: '局部多云',
                3: '阴天',
                45: '雾',
                48: '白霜雾',
                51: '微量毛毛雨',
                53: '中度毛毛雨',
                55: '浓密毛毛雨',
                56: '微弱冻毛毛雨',
                57: '稠密冻毛毛雨',
                61: '小雨',
                63: '中雨',
                65: '大暴雨',
                66: '轻度冻雨',
                67: '重度冻雨',
                71: '小雪',
                73: '中雪',
                75: '大暴雪',
                77: '雪粒',
                80: '轻微阵雨',
                81: '中度阵雨',
                82: '暴烈强阵雨',
                85: '小阵雪',
                86: '强阵雪',
                95: '雷暴天气',
                96: '雷暴伴微弱冰雹',
                99: '强雷暴伴强烈冰雹'
            }
        },

        ja: {
            appName: 'SkySoft 天気',
            appTagline: '世界天気予報',
            searchPlaceholder: '都市を検索（例：Tokyo, Kuala Lumpur, London）...',
            quickLabel: '人気の都市：',
            favoritesBtn: 'お気に入り',
            historyBtn: '検索履歴',
            manualBtn: 'マニュアル',
            installBtn: 'アプリをインストール',
            closeBtn: '閉じる',
            clearBtn: 'すべて削除',
            emptyFavorites: 'お気に入り都市はまだ登録されていません。カードのハートを押して追加できます！',
            emptyHistory: '検索履歴はまだありません。',
            databaseOfflineNotice: 'データベースオフライン中。ローカルストレージを使用しています。',

            // Weather labels
            feelsLike: '体感温度',
            humidity: '湿度',
            windSpeed: '風速',
            windDirection: '風向',
            pressure: '気圧',
            sunrise: '日の出',
            sunset: '日の入り',
            localTime: '現地時間',
            today: '今日',
            tomorrow: '明日',
            high: '最高',
            low: '最低',

            // Headings
            hourlyTitle: '24時間毎の天気予報',
            dailyTitle: '7日間の天気予報',
            countryTitle: '国別 A–Z インデックス',
            countrySubtitle: '世界中の国をアルファベット順に検索し、首都の天気をすぐに確認できます',
            selectLetter: 'アルファベットを選択：',
            noCountriesForLetter: 'この文字で始まる国が見つかりませんでした：',
            loadingCountries: '国リストを読み込み中...',

            // Hierarchical Location Explorer
            explorerTitle: '地域エクスプローラー：国 → 州/都道府県 → 都市',
            explorerSubtitle: '国を選択して首都の天気を表示し、州/都道府県と都市を選択',
            stepCountry: 'ステップ1：国',
            selectCountryPrompt: '国を選択（首都の天気）...',
            stepState: 'ステップ2：州 / 都道府県',
            selectStatePrompt: '州 / 都道府県を選択...',
            selectStateFirst: '先に国を選択してください',
            stepCity: 'ステップ3：都市',
            selectCityPrompt: '都市を選択...',
            selectCityFirst: '先に州/都道府県を選択してください',
            resetExplorer: 'リセット',
            loadingStates: '都道府県を読み込み中...',
            loadingCities: '都市を読み込み中...',

            // Errors
            errorWeather: '天気情報を読み込めませんでした。もう一度お試しください。',
            errorSearch: '都市を検索できませんでした。再試行してください。',
            noCityFound: '一致する都市が見つかりませんでした。綴りを確認してください。',

            // User Manual
            manualTitle: 'ユーザーマニュアル＆利用ガイド',
            manualSubtitle: 'SkySoft Weather を快適にご利用いただくための手順',
            manualEscHint: 'ESCキーまたは外側をクリックして閉じる',
            manualSearchTitle: '1. 都市の検索方法',
            manualSearchDesc: '上部の検索バーに都市名（例："Tokyo" や "Kuala Lumpur"）を入力します。表示されるサジェスト候補から選択すると、最新の天気が表示されます。',
            manualWeatherTitle: '2. 天気情報の見方',
            manualWeatherDesc: 'リアルタイムの気温、体感温度、気象状況、湿度、風速・風向、気圧、日の出・日の入り時刻が表示されます。横スクロールで24時間予報、下部で7日間予報を確認できます。',
            manualCountryTitle: '3. 国別 A–Z の使い方',
            manualCountryDesc: '国ブラウザの A から Z までの文字をクリックすると、その文字で始まる国一覧が表示されます。国カードをクリックすると、その国の首都の天気を即座に取得します。',
            manualFavTitle: '4. お気に入りと履歴の使い方',
            manualFavDesc: 'メインカードのハートアイコンを押してお気に入りの登録・解除ができます。上部ナビゲーションの「お気に入り」や「検索履歴」からいつでも素早く呼び出せます。',
            manualLangTitle: '5. 言語の変更方法',
            manualLangDesc: '右上の言語セレクターから、英語・マレー語・中国語・日本語を切り替えられます。選択した言語はブラウザに自動保存されます。',

            // Compass
            compass: {
                N: '北', NNE: '北北東', NE: '北東', ENE: '東北東',
                E: '東', ESE: '東南東', SE: '南東', SSE: '南南東',
                S: '南', SSW: '南南西', SW: '南西', WSW: '西南西',
                W: '西', WNW: '西北西', NW: '北西', NNW: '北北西'
            },

            // Days
            days: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
            daysShort: ['日', '月', '火', '水', '木', '金', '土'],

            // WMO Weather Codes
            conditions: {
                0: '快晴',
                1: '晴れ',
                2: '一部曇り',
                3: '曇り',
                45: '霧',
                48: '着氷性の霧',
                51: '小雨（霧雨）',
                53: '並の霧雨',
                55: '強い霧雨',
                56: '着氷性の軽い霧雨',
                57: '着氷性の強い霧雨',
                61: '小雨',
                63: '並の雨',
                65: '大雨',
                66: '軽い着氷性の雨',
                67: '強い着氷性の雨',
                71: '小雪',
                73: '並の雪',
                75: '大雪',
                77: '細氷・霧雪',
                80: 'にわか雨（弱）',
                81: 'にわか雨（中）',
                82: '激しいにわか雨',
                85: 'にわか雪（弱）',
                86: '激しいにわか雪',
                95: '雷雨',
                96: '雷雨（弱い雹を伴う）',
                99: '激しい雷雨（強い雹を伴う）'
            }
        }
    },

    /**
     * Initialize language from localStorage or default to 'en'
     */
    init() {
        const saved = localStorage.getItem('skysoft_lang');
        if (saved && this.supported.includes(saved)) {
            this.currentLang = saved;
        } else {
            this.currentLang = 'en';
        }
    },

    /**
     * Set active language and save to localStorage
     * @param {string} lang 
     */
    setLanguage(lang) {
        if (this.supported.includes(lang)) {
            this.currentLang = lang;
            localStorage.setItem('skysoft_lang', lang);
        }
    },

    /**
     * Translate key
     * @param {string} key 
     * @returns {string}
     */
    t(key) {
        const dict = this.dictionaries[this.currentLang] || this.dictionaries.en;
        return dict[key] !== undefined ? dict[key] : (this.dictionaries.en[key] || key);
    },

    /**
     * Translate WMO Weather Code
     * @param {number} code 
     * @returns {string}
     */
    getConditionText(code) {
        const dict = this.dictionaries[this.currentLang] || this.dictionaries.en;
        return dict.conditions[code] || this.dictionaries.en.conditions[code] || dict.conditions[0];
    },

    /**
     * Translate Compass Direction
     * @param {string} direction 
     * @returns {string}
     */
    getCompassDirection(direction) {
        const dict = this.dictionaries[this.currentLang] || this.dictionaries.en;
        return dict.compass[direction] || direction;
    },

    /**
     * Translate weekday name
     * @param {number} dayIndex (0-6)
     * @param {boolean} short 
     * @returns {string}
     */
    getDayName(dayIndex, short = false) {
        const dict = this.dictionaries[this.currentLang] || this.dictionaries.en;
        return short ? dict.daysShort[dayIndex] : dict.days[dayIndex];
    }
};

// Export to window
window.I18N = I18N;
