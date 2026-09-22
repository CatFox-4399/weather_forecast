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
            sunTimes: 'Sunrise / Sunset',
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
            },

            // Sky Atmosphere Modes
            skyModes: {
                auto: 'Sky: Live Weather',
                sunrise: 'Golden Sunrise / Dawn (Sun)',
                clearDay: 'Sunny Day (Sun)',
                sunset: 'Dramatic Sunset / Dusk (Sun)',
                clearNight: 'Starry Night (Moon & Stars)',
                partlyCloudyDay: 'Partly Cloudy (Day)',
                partlyCloudySunset: 'Sunset with Clouds',
                partlyCloudyNight: 'Partly Cloudy (Night)',
                cloudyDay: 'Overcast Clouds (Day)',
                cloudyNight: 'Overcast Clouds (Night)',
                rainDay: 'Light Rain (Day)',
                rainNight: 'Light Rain (Night)',
                heavyRainDay: 'Heavy Rain & Strong Wind (Day)',
                heavyRainNight: 'Heavy Rain & Strong Wind (Night)',
                thunderstormDay: 'Thunderstorm & Lightning (Day)',
                thunderstormNight: 'Thunderstorm & Lightning (Night)',
                snowDay: 'Snow (Day)',
                snowNight: 'Snow (Night)',
                fog: 'Atmospheric Fog'
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
            sunTimes: 'Terbit & Terbenam Matahari',
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
            },

            // Sky Atmosphere Modes
            skyModes: {
                auto: 'Langit: Cuaca Semasa',
                sunrise: 'Terbit Matahari / Fajar Emas',
                clearDay: 'Hari Cerah (Matahari)',
                sunset: 'Matahari Terbenam / Senja Merah',
                clearNight: 'Malam Berbintang (Bulan & Bintang)',
                partlyCloudyDay: 'Sebahagian Mendung (Siang)',
                partlyCloudySunset: 'Senja Bersama Awan',
                partlyCloudyNight: 'Sebahagian Mendung (Malam)',
                cloudyDay: 'Awan Mendung (Siang)',
                cloudyNight: 'Awan Mendung (Malam)',
                rainDay: 'Hujan Ringan (Siang)',
                rainNight: 'Hujan Ringan (Malam)',
                heavyRainDay: 'Hujan Lebat & Angin Kencang (Siang)',
                heavyRainNight: 'Hujan Lebat & Angin Kencang (Malam)',
                thunderstormDay: 'Ribut Petir & Kilat (Siang)',
                thunderstormNight: 'Ribut Petir & Kilat (Malam)',
                snowDay: 'Salji (Siang)',
                snowNight: 'Salji (Malam)',
                fog: 'Kabus Tebal'
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
            sunTimes: '日出 / 日落时间',
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
            },

            // Sky Atmosphere Modes
            skyModes: {
                auto: '天空：实时天气',
                sunrise: '日出晨曦 / 金色黎明',
                clearDay: '晴天（艳阳）',
                sunset: '壮丽晚霞 / 落日暮色',
                clearNight: '晴朗夜晚（月亮与繁星）',
                partlyCloudyDay: '局部多云（白天）',
                partlyCloudySunset: '晚霞流云',
                partlyCloudyNight: '局部多云（夜晚）',
                cloudyDay: '多云阴天（白天）',
                cloudyNight: '多云阴天（夜晚）',
                rainDay: '小雨（白天）',
                rainNight: '小雨（夜晚）',
                heavyRainDay: '大暴雨与强风（白天）',
                heavyRainNight: '大暴雨与强风（夜晚）',
                thunderstormDay: '雷暴与闪电（白天）',
                thunderstormNight: '雷暴与闪电（夜晚）',
                snowDay: '降雪（白天）',
                snowNight: '降雪（夜晚）',
                fog: '浓雾大气'
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
            sunTimes: '日の出 / 日の入り',
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
            },

            // Sky Atmosphere Modes
            skyModes: {
                auto: '空：リアルタイム天気',
                sunrise: '日の出・朝焼け（黄金の夜明け）',
                clearDay: '快晴（太陽）',
                sunset: '夕焼け・黄昏（茜色の夕日）',
                clearNight: '満天の星空（月と星）',
                partlyCloudyDay: '所により曇り（昼）',
                partlyCloudySunset: '夕焼け雲',
                partlyCloudyNight: '所により曇り（夜）',
                cloudyDay: '曇天・厚い雲（昼）',
                cloudyNight: '曇天・厚い雲（夜）',
                rainDay: '小雨（昼）',
                rainNight: '小雨（夜）',
                heavyRainDay: '豪雨と強風（昼）',
                heavyRainNight: '豪雨と強風（夜）',
                thunderstormDay: '雷雨と稲妻（昼）',
                thunderstormNight: '雷雨と稲妻（夜）',
                snowDay: '雪（昼）',
                snowNight: '雪（夜）',
                fog: '大気の濃霧'
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
    },

    /**
     * Translate Sky Atmosphere mode name
     * @param {string} modeKey 
     * @returns {string}
     */
    getSkyModeName(modeKey) {
        const dict = this.dictionaries[this.currentLang] || this.dictionaries.en;
        if (dict.skyModes && dict.skyModes[modeKey]) {
            return dict.skyModes[modeKey];
        }
        return this.dictionaries.en.skyModes?.[modeKey] || modeKey;
    },

    /**
     * Normalize text (strip diacritics, accents, macrons)
     * @param {string} str
     * @returns {string}
     */
    normalize(str) {
        if (!str) return '';
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    },
    /**
     * Country Name to ISO2 Code Mapping
     */
    countryNameToCode: {
    "afghanistan": "AF",
    "aland islands": "AX",
    "albania": "AL",
    "algeria": "DZ",
    "american samoa": "AS",
    "andorra": "AD",
    "angola": "AO",
    "anguilla": "AI",
    "antarctica": "AQ",
    "antigua and barbuda": "AG",
    "argentina": "AR",
    "armenia": "AM",
    "aruba": "AW",
    "australia": "AU",
    "austria": "AT",
    "azerbaijan": "AZ",
    "bahrain": "BH",
    "bangladesh": "BD",
    "barbados": "BB",
    "belarus": "BY",
    "belgium": "BE",
    "belize": "BZ",
    "benin": "BJ",
    "bermuda": "BM",
    "bhutan": "BT",
    "bolivia": "BO",
    "bonaire, sint eustatius and saba": "BQ",
    "bosnia and herzegovina": "BA",
    "botswana": "BW",
    "bouvet island": "BV",
    "brazil": "BR",
    "british indian ocean territory": "IO",
    "brunei": "BN",
    "bulgaria": "BG",
    "burkina faso": "BF",
    "burundi": "BI",
    "cambodia": "KH",
    "cameroon": "CM",
    "canada": "CA",
    "cape verde": "CV",
    "cayman islands": "KY",
    "central african republic": "CF",
    "chad": "TD",
    "chile": "CL",
    "china": "CN",
    "christmas island": "CX",
    "cocos (keeling) islands": "CC",
    "colombia": "CO",
    "comoros": "KM",
    "congo": "CG",
    "cook islands": "CK",
    "costa rica": "CR",
    "croatia": "HR",
    "cuba": "CU",
    "curaçao": "CW",
    "cyprus": "CY",
    "czech republic": "CZ",
    "democratic republic of the congo": "CD",
    "denmark": "DK",
    "djibouti": "DJ",
    "dominica": "DM",
    "dominican republic": "DO",
    "ecuador": "EC",
    "egypt": "EG",
    "el salvador": "SV",
    "equatorial guinea": "GQ",
    "eritrea": "ER",
    "estonia": "EE",
    "eswatini": "SZ",
    "ethiopia": "ET",
    "falkland islands": "FK",
    "faroe islands": "FO",
    "fiji islands": "FJ",
    "finland": "FI",
    "france": "FR",
    "french guiana": "GF",
    "french polynesia": "PF",
    "french southern territories": "TF",
    "gabon": "GA",
    "georgia": "GE",
    "germany": "DE",
    "ghana": "GH",
    "gibraltar": "GI",
    "greece": "GR",
    "greenland": "GL",
    "grenada": "GD",
    "guadeloupe": "GP",
    "guam": "GU",
    "guatemala": "GT",
    "guernsey": "GG",
    "guinea": "GN",
    "guinea-bissau": "GW",
    "guyana": "GY",
    "haiti": "HT",
    "heard island and mcdonald islands": "HM",
    "honduras": "HN",
    "hong kong s.a.r.": "HK",
    "hungary": "HU",
    "iceland": "IS",
    "india": "IN",
    "indonesia": "ID",
    "iran": "IR",
    "iraq": "IQ",
    "ireland": "IE",
    "israel": "IL",
    "italy": "IT",
    "ivory coast": "CI",
    "jamaica": "JM",
    "japan": "JP",
    "jersey": "JE",
    "jordan": "JO",
    "kazakhstan": "KZ",
    "kenya": "KE",
    "kiribati": "KI",
    "kosovo": "XK",
    "kuwait": "KW",
    "kyrgyzstan": "KG",
    "laos": "LA",
    "latvia": "LV",
    "lebanon": "LB",
    "lesotho": "LS",
    "liberia": "LR",
    "libya": "LY",
    "liechtenstein": "LI",
    "lithuania": "LT",
    "luxembourg": "LU",
    "macau s.a.r.": "MO",
    "madagascar": "MG",
    "malawi": "MW",
    "malaysia": "MY",
    "maldives": "MV",
    "mali": "ML",
    "malta": "MT",
    "man (isle of)": "IM",
    "marshall islands": "MH",
    "martinique": "MQ",
    "mauritania": "MR",
    "mauritius": "MU",
    "mayotte": "YT",
    "mexico": "MX",
    "micronesia": "FM",
    "moldova": "MD",
    "monaco": "MC",
    "mongolia": "MN",
    "montenegro": "ME",
    "montserrat": "MS",
    "morocco": "MA",
    "mozambique": "MZ",
    "myanmar": "MM",
    "namibia": "NA",
    "nauru": "NR",
    "nepal": "NP",
    "netherlands": "NL",
    "new caledonia": "NC",
    "new zealand": "NZ",
    "nicaragua": "NI",
    "niger": "NE",
    "nigeria": "NG",
    "niue": "NU",
    "norfolk island": "NF",
    "north korea": "KP",
    "north macedonia": "MK",
    "northern mariana islands": "MP",
    "norway": "NO",
    "oman": "OM",
    "pakistan": "PK",
    "palau": "PW",
    "palestinian territory occupied": "PS",
    "panama": "PA",
    "papua new guinea": "PG",
    "paraguay": "PY",
    "peru": "PE",
    "philippines": "PH",
    "pitcairn island": "PN",
    "poland": "PL",
    "portugal": "PT",
    "puerto rico": "PR",
    "qatar": "QA",
    "reunion": "RE",
    "romania": "RO",
    "russia": "RU",
    "rwanda": "RW",
    "saint helena": "SH",
    "saint kitts and nevis": "KN",
    "saint lucia": "LC",
    "saint pierre and miquelon": "PM",
    "saint vincent and the grenadines": "VC",
    "saint-barthelemy": "BL",
    "saint-martin (french part)": "MF",
    "samoa": "WS",
    "san marino": "SM",
    "sao tome and principe": "ST",
    "saudi arabia": "SA",
    "senegal": "SN",
    "serbia": "RS",
    "seychelles": "SC",
    "sierra leone": "SL",
    "singapore": "SG",
    "sint maarten (dutch part)": "SX",
    "slovakia": "SK",
    "slovenia": "SI",
    "solomon islands": "SB",
    "somalia": "SO",
    "south africa": "ZA",
    "south georgia": "GS",
    "south korea": "KR",
    "south sudan": "SS",
    "spain": "ES",
    "sri lanka": "LK",
    "sudan": "SD",
    "suriname": "SR",
    "svalbard and jan mayen islands": "SJ",
    "sweden": "SE",
    "switzerland": "CH",
    "syria": "SY",
    "taiwan": "TW",
    "tajikistan": "TJ",
    "tanzania": "TZ",
    "thailand": "TH",
    "the bahamas": "BS",
    "the gambia": "GM",
    "timor-leste": "TL",
    "togo": "TG",
    "tokelau": "TK",
    "tonga": "TO",
    "trinidad and tobago": "TT",
    "tunisia": "TN",
    "turkey": "TR",
    "turkmenistan": "TM",
    "turks and caicos islands": "TC",
    "tuvalu": "TV",
    "uganda": "UG",
    "ukraine": "UA",
    "united arab emirates": "AE",
    "united kingdom": "GB",
    "united states": "US",
    "united states minor outlying islands": "UM",
    "uruguay": "UY",
    "uzbekistan": "UZ",
    "vanuatu": "VU",
    "vatican city state (holy see)": "VA",
    "venezuela": "VE",
    "vietnam": "VN",
    "virgin islands (british)": "VG",
    "virgin islands (us)": "VI",
    "wallis and futuna islands": "WF",
    "western sahara": "EH",
    "yemen": "YE",
    "zambia": "ZM",
    "zimbabwe": "ZW",
    "usa": "US",
    "united states of america": "US",
    "uk": "GB",
    "great britain": "GB",
    "britain": "GB",
    "england": "GB",
    "scotland": "GB",
    "wales": "GB",
    "republic of korea": "KR",
    "russian federation": "RU"
},

    /**
     * Direct Country Name Fallback Dictionary
     */
    countryFallback: {
    "MY": {
        "zh": "马来西亚",
        "ja": "マレーシア",
        "ms": "Malaysia"
    },
    "SG": {
        "zh": "新加坡",
        "ja": "シンガポール",
        "ms": "Singapura"
    },
    "JP": {
        "zh": "日本",
        "ja": "日本",
        "ms": "Jepun"
    },
    "CN": {
        "zh": "中国",
        "ja": "中国",
        "ms": "China"
    },
    "US": {
        "zh": "美国",
        "ja": "アメリカ合衆国",
        "ms": "Amerika Syarikat"
    },
    "GB": {
        "zh": "英国",
        "ja": "イギリス",
        "ms": "United Kingdom"
    },
    "AU": {
        "zh": "澳大利亚",
        "ja": "オーストラリア",
        "ms": "Australia"
    },
    "CA": {
        "zh": "加拿大",
        "ja": "カナダ",
        "ms": "Kanada"
    },
    "DE": {
        "zh": "德国",
        "ja": "ドイツ",
        "ms": "Jerman"
    },
    "FR": {
        "zh": "法国",
        "ja": "フランス",
        "ms": "Perancis"
    },
    "IT": {
        "zh": "意大利",
        "ja": "イタリア",
        "ms": "Itali"
    },
    "ES": {
        "zh": "西班牙",
        "ja": "スペイン",
        "ms": "Sepanyol"
    },
    "KR": {
        "zh": "韩国",
        "ja": "韓国",
        "ms": "Korea Selatan"
    },
    "ID": {
        "zh": "印度尼西亚",
        "ja": "インドネシア",
        "ms": "Indonesia"
    },
    "TH": {
        "zh": "泰国",
        "ja": "タイ",
        "ms": "Thailand"
    },
    "VN": {
        "zh": "越南",
        "ja": "ベトナム",
        "ms": "Vietnam"
    },
    "PH": {
        "zh": "菲律宾",
        "ja": "フィリピン",
        "ms": "Filipina"
    },
    "IN": {
        "zh": "印度",
        "ja": "インド",
        "ms": "India"
    },
    "BR": {
        "zh": "巴西",
        "ja": "ブラジル",
        "ms": "Brazil"
    },
    "NG": {
        "zh": "尼日利亚",
        "ja": "ナイジェリア",
        "ms": "Nigeria"
    },
    "RU": {
        "zh": "俄罗斯",
        "ja": "ロシア",
        "ms": "Rusia"
    },
    "EG": {
        "zh": "埃及",
        "ja": "エジプト",
        "ms": "Mesir"
    },
    "ZA": {
        "zh": "南非",
        "ja": "南アフリカ",
        "ms": "Afrika Selatan"
    },
    "SA": {
        "zh": "沙特阿拉伯",
        "ja": "サウジアラビア",
        "ms": "Arab Saudi"
    },
    "AE": {
        "zh": "阿拉伯联合酋长国",
        "ja": "アラブ首長国連邦",
        "ms": "Emiriah Arab Bersatu"
    },
    "TR": {
        "zh": "土耳其",
        "ja": "トルコ",
        "ms": "Turki"
    },
    "MX": {
        "zh": "墨西哥",
        "ja": "メキシコ",
        "ms": "Mexico"
    },
    "AR": {
        "zh": "阿根廷",
        "ja": "アルゼンチン",
        "ms": "Argentina"
    },
    "NL": {
        "zh": "荷兰",
        "ja": "オランダ",
        "ms": "Belanda"
    },
    "CH": {
        "zh": "瑞士",
        "ja": "スイス",
        "ms": "Switzerland"
    },
    "SE": {
        "zh": "瑞典",
        "ja": "スウェーデン",
        "ms": "Sweden"
    },
    "NO": {
        "zh": "挪威",
        "ja": "ノルウェー",
        "ms": "Norway"
    },
    "DK": {
        "zh": "丹麦",
        "ja": "デンマーク",
        "ms": "Denmark"
    },
    "FI": {
        "zh": "芬兰",
        "ja": "フィンランド",
        "ms": "Finland"
    },
    "PL": {
        "zh": "波兰",
        "ja": "ポーランド",
        "ms": "Poland"
    },
    "GR": {
        "zh": "希腊",
        "ja": "ギリシャ",
        "ms": "Greece"
    },
    "PT": {
        "zh": "葡萄牙",
        "ja": "ポルトガル",
        "ms": "Portugal"
    },
    "IE": {
        "zh": "爱尔兰",
        "ja": "アイルランド",
        "ms": "Ireland"
    },
    "NZ": {
        "zh": "新西兰",
        "ja": "ニュージーランド",
        "ms": "New Zealand"
    }
},

    /**
     * World Capitals & Major Global Cities Dictionary
     */
    cities: {
    "Kabul": {
        "zh": "喀布尔",
        "ja": "カブール",
        "ms": "Kabul"
    },
    "Yerevan": {
        "zh": "埃里温",
        "ja": "エレバン",
        "ms": "Yerevan"
    },
    "Baku": {
        "zh": "巴库",
        "ja": "バクー",
        "ms": "Baku"
    },
    "Manama": {
        "zh": "麦纳麦",
        "ja": "マナーマ",
        "ms": "Manama"
    },
    "Dhaka": {
        "zh": "达卡",
        "ja": "ダッカ",
        "ms": "Dhaka"
    },
    "Thimphu": {
        "zh": "廷布",
        "ja": "ティンプー",
        "ms": "Thimphu"
    },
    "Bandar Seri Begawan": {
        "zh": "斯里巴加湾市",
        "ja": "バンダルスリブガワン",
        "ms": "Bandar Seri Begawan"
    },
    "Phnom Penh": {
        "zh": "金边",
        "ja": "プノンペン",
        "ms": "Phnom Penh"
    },
    "Beijing": {
        "zh": "北京",
        "ja": "北京",
        "ms": "Beijing"
    },
    "Nicosia": {
        "zh": "尼科西亚",
        "ja": "ニコシア",
        "ms": "Nicosia"
    },
    "Tbilisi": {
        "zh": "第比利斯",
        "ja": "トビリシ",
        "ms": "Tbilisi"
    },
    "New Delhi": {
        "zh": "新德里",
        "ja": "ニューデリー",
        "ms": "New Delhi"
    },
    "Jakarta": {
        "zh": "雅加达",
        "ja": "ジャカルタ",
        "ms": "Jakarta"
    },
    "Tehran": {
        "zh": "德黑兰",
        "ja": "テヘラン",
        "ms": "Tehran"
    },
    "Baghdad": {
        "zh": "巴格达",
        "ja": "バグダッド",
        "ms": "Baghdad"
    },
    "Jerusalem": {
        "zh": "耶路撒冷",
        "ja": "エルサレム",
        "ms": "Baitulmaqdis"
    },
    "Tokyo": {
        "zh": "东京",
        "ja": "東京",
        "ms": "Tokyo"
    },
    "Amman": {
        "zh": "安曼",
        "ja": "アンマン",
        "ms": "Amman"
    },
    "Astana": {
        "zh": "阿斯塔纳",
        "ja": "アスタナ",
        "ms": "Astana"
    },
    "Kuwait City": {
        "zh": "科威特城",
        "ja": "クウェート市",
        "ms": "Bandar Kuwait"
    },
    "Bishkek": {
        "zh": "比什凯克",
        "ja": "ビシュケク",
        "ms": "Bishkek"
    },
    "Vientiane": {
        "zh": "万象",
        "ja": "ビエンチャン",
        "ms": "Vientiane"
    },
    "Beirut": {
        "zh": "贝鲁特",
        "ja": "ベイルート",
        "ms": "Beirut"
    },
    "Kuala Lumpur": {
        "zh": "吉隆坡",
        "ja": "クアラルンプール",
        "ms": "Kuala Lumpur"
    },
    "Male": {
        "zh": "马累",
        "ja": "マレ",
        "ms": "Male"
    },
    "Ulaanbaatar": {
        "zh": "乌兰巴托",
        "ja": "ウランバートル",
        "ms": "Ulaanbaatar"
    },
    "Naypyidaw": {
        "zh": "内比都",
        "ja": "ネピドー",
        "ms": "Naypyidaw"
    },
    "Kathmandu": {
        "zh": "加德满都",
        "ja": "カトマンズ",
        "ms": "Kathmandu"
    },
    "Pyongyang": {
        "zh": "平壤",
        "ja": "ピョンヤン",
        "ms": "Pyongyang"
    },
    "Muscat": {
        "zh": "马斯喀特",
        "ja": "マスカット",
        "ms": "Muscat"
    },
    "Islamabad": {
        "zh": "伊斯兰堡",
        "ja": "イスラマバード",
        "ms": "Islamabad"
    },
    "Manila": {
        "zh": "马尼拉",
        "ja": "マニラ",
        "ms": "Manila"
    },
    "Doha": {
        "zh": "多哈",
        "ja": "ドーハ",
        "ms": "Doha"
    },
    "Riyadh": {
        "zh": "利雅得",
        "ja": "リヤド",
        "ms": "Riyadh"
    },
    "Singapore": {
        "zh": "新加坡",
        "ja": "シンガポール",
        "ms": "Singapura"
    },
    "Seoul": {
        "zh": "首尔",
        "ja": "ソウル",
        "ms": "Seoul"
    },
    "Colombo": {
        "zh": "科伦坡",
        "ja": "コロンボ",
        "ms": "Colombo"
    },
    "Damascus": {
        "zh": "大马士革",
        "ja": "ダマスカス",
        "ms": "Damsyik"
    },
    "Dushanbe": {
        "zh": "杜尚别",
        "ja": "ドゥシャンベ",
        "ms": "Dushanbe"
    },
    "Bangkok": {
        "zh": "曼谷",
        "ja": "バンコク",
        "ms": "Bangkok"
    },
    "Dili": {
        "zh": "帝力",
        "ja": "ディリ",
        "ms": "Dili"
    },
    "Ankara": {
        "zh": "安卡拉",
        "ja": "アンカラ",
        "ms": "Ankara"
    },
    "Ashgabat": {
        "zh": "阿什哈巴德",
        "ja": "アシガバート",
        "ms": "Ashgabat"
    },
    "Abu Dhabi": {
        "zh": "阿布扎比",
        "ja": "アブダビ",
        "ms": "Abu Dhabi"
    },
    "Tashkent": {
        "zh": "塔什干",
        "ja": "タシュケント",
        "ms": "Tashkent"
    },
    "Hanoi": {
        "zh": "河内",
        "ja": "ハノイ",
        "ms": "Hanoi"
    },
    "Sanaa": {
        "zh": "萨那",
        "ja": "サナア",
        "ms": "Sana'a"
    },
    "Canberra": {
        "zh": "堪培拉",
        "ja": "キャンベラ",
        "ms": "Canberra"
    },
    "Suva": {
        "zh": "苏瓦",
        "ja": "スバ",
        "ms": "Suva"
    },
    "Wellington": {
        "zh": "惠灵顿",
        "ja": "ウェリントン",
        "ms": "Wellington"
    },
    "Port Moresby": {
        "zh": "莫尔兹比港",
        "ja": "ポートモレスビー",
        "ms": "Port Moresby"
    },
    "Apia": {
        "zh": "阿皮亚",
        "ja": "アピア",
        "ms": "Apia"
    },
    "Nuku'alofa": {
        "zh": "努库阿洛法",
        "ja": "ヌクアロファ",
        "ms": "Nuku'alofa"
    },
    "Tirana": {
        "zh": "地拉那",
        "ja": "ティラナ",
        "ms": "Tirana"
    },
    "Andorra la Vella": {
        "zh": "安道尔城",
        "ja": "アンドラ・ラ・ベリャ",
        "ms": "Andorra la Vella"
    },
    "Vienna": {
        "zh": "维也纳",
        "ja": "ウィーン",
        "ms": "Vienna"
    },
    "Minsk": {
        "zh": "明斯克",
        "ja": "ミンスク",
        "ms": "Minsk"
    },
    "Brussels": {
        "zh": "布鲁塞尔",
        "ja": "ブリュッセル",
        "ms": "Brussels"
    },
    "Sarajevo": {
        "zh": "萨拉热窝",
        "ja": "サラエボ",
        "ms": "Sarajevo"
    },
    "Sofia": {
        "zh": "索非亚",
        "ja": "ソフィア",
        "ms": "Sofia"
    },
    "Zagreb": {
        "zh": "萨格勒布",
        "ja": "ザグレブ",
        "ms": "Zagreb"
    },
    "Prague": {
        "zh": "布拉格",
        "ja": "プラハ",
        "ms": "Prague"
    },
    "Copenhagen": {
        "zh": "哥本哈根",
        "ja": "コペンハーゲン",
        "ms": "Copenhagen"
    },
    "Tallinn": {
        "zh": "塔林",
        "ja": "タリン",
        "ms": "Tallinn"
    },
    "Helsinki": {
        "zh": "赫尔辛基",
        "ja": "ヘルシンキ",
        "ms": "Helsinki"
    },
    "Paris": {
        "zh": "巴黎",
        "ja": "パリ",
        "ms": "Paris"
    },
    "Berlin": {
        "zh": "柏林",
        "ja": "ベルリン",
        "ms": "Berlin"
    },
    "Athens": {
        "zh": "雅典",
        "ja": "アテネ",
        "ms": "Athens"
    },
    "Budapest": {
        "zh": "布达佩斯",
        "ja": "ブダペスト",
        "ms": "Budapest"
    },
    "Reykjavik": {
        "zh": "雷克雅未克",
        "ja": "レイキャビク",
        "ms": "Reykjavik"
    },
    "Dublin": {
        "zh": "都柏林",
        "ja": "ダブリン",
        "ms": "Dublin"
    },
    "Rome": {
        "zh": "罗马",
        "ja": "ローマ",
        "ms": "Rome"
    },
    "Pristina": {
        "zh": "普里什蒂纳",
        "ja": "プリシュティナ",
        "ms": "Pristina"
    },
    "Riga": {
        "zh": "里加",
        "ja": "リガ",
        "ms": "Riga"
    },
    "Vaduz": {
        "zh": "瓦杜兹",
        "ja": "ファドゥーツ",
        "ms": "Vaduz"
    },
    "Vilnius": {
        "zh": "维尔纽斯",
        "ja": "ビリニュス",
        "ms": "Vilnius"
    },
    "Luxembourg": {
        "zh": "卢森堡",
        "ja": "ルクセンブルク",
        "ms": "Luxembourg"
    },
    "Valletta": {
        "zh": "瓦莱塔",
        "ja": "バレッタ",
        "ms": "Valletta"
    },
    "Chisinau": {
        "zh": "基希讷乌",
        "ja": "キシナウ",
        "ms": "Chisinau"
    },
    "Monaco": {
        "zh": "摩纳哥",
        "ja": "モナコ",
        "ms": "Monaco"
    },
    "Podgorica": {
        "zh": "波德戈里察",
        "ja": "ポドゴリツァ",
        "ms": "Podgorica"
    },
    "Amsterdam": {
        "zh": "阿姆斯特丹",
        "ja": "アムステルダム",
        "ms": "Amsterdam"
    },
    "Skopje": {
        "zh": "斯科普里",
        "ja": "スコピエ",
        "ms": "Skopje"
    },
    "Oslo": {
        "zh": "奥斯陆",
        "ja": "オスロ",
        "ms": "Oslo"
    },
    "Warsaw": {
        "zh": "华沙",
        "ja": "ワルシャワ",
        "ms": "Warsaw"
    },
    "Lisbon": {
        "zh": "里斯本",
        "ja": "リスボン",
        "ms": "Lisbon"
    },
    "Bucharest": {
        "zh": "布加勒斯特",
        "ja": "ブカレスト",
        "ms": "Bucharest"
    },
    "Moscow": {
        "zh": "莫斯科",
        "ja": "モスクワ",
        "ms": "Moscow"
    },
    "San Marino": {
        "zh": "圣马力诺",
        "ja": "サンマリノ",
        "ms": "San Marino"
    },
    "Belgrade": {
        "zh": "贝尔格莱德",
        "ja": "ベオグラード",
        "ms": "Belgrade"
    },
    "Bratislava": {
        "zh": "布拉迪斯拉发",
        "ja": "ブラチスラヴァ",
        "ms": "Bratislava"
    },
    "Ljubljana": {
        "zh": "卢布尔雅那",
        "ja": "リュブリャナ",
        "ms": "Ljubljana"
    },
    "Madrid": {
        "zh": "马德里",
        "ja": "マドリード",
        "ms": "Madrid"
    },
    "Stockholm": {
        "zh": "斯德哥尔摩",
        "ja": "ストックホルム",
        "ms": "Stockholm"
    },
    "Bern": {
        "zh": "伯尔尼",
        "ja": "ベルン",
        "ms": "Bern"
    },
    "Kyiv": {
        "zh": "基辅",
        "ja": "キーウ",
        "ms": "Kyiv"
    },
    "Kiev": {
        "zh": "基辅",
        "ja": "キエフ",
        "ms": "Kyiv"
    },
    "London": {
        "zh": "伦敦",
        "ja": "ロンドン",
        "ms": "London"
    },
    "Vatican City": {
        "zh": "梵蒂冈城",
        "ja": "バチカン市国",
        "ms": "Vatican"
    },
    "Ottawa": {
        "zh": "渥太华",
        "ja": "オタワ",
        "ms": "Ottawa"
    },
    "Washington": {
        "zh": "华盛顿",
        "ja": "ワシントン",
        "ms": "Washington"
    },
    "Washington, D.C.": {
        "zh": "华盛顿",
        "ja": "ワシントンD.C.",
        "ms": "Washington, D.C."
    },
    "Mexico City": {
        "zh": "墨西哥城",
        "ja": "メキシコシティ",
        "ms": "Bandar Mexico"
    },
    "Belmopan": {
        "zh": "贝尔莫潘",
        "ja": "ベルモパン",
        "ms": "Belmopan"
    },
    "San Jose": {
        "zh": "圣何塞",
        "ja": "サンホセ",
        "ms": "San Jose"
    },
    "San Salvador": {
        "zh": "圣萨尔瓦多",
        "ja": "サンサルバドル",
        "ms": "San Salvador"
    },
    "Guatemala City": {
        "zh": "危地马拉城",
        "ja": "グアテマラシティ",
        "ms": "Bandar Guatemala"
    },
    "Tegucigalpa": {
        "zh": "特古西加尔巴",
        "ja": "テグシガルパ",
        "ms": "Tegucigalpa"
    },
    "Managua": {
        "zh": "马那瓜",
        "ja": "マナグア",
        "ms": "Managua"
    },
    "Panama City": {
        "zh": "巴拿马城",
        "ja": "パナマシティ",
        "ms": "Bandar Panama"
    },
    "Buenos Aires": {
        "zh": "布宜诺斯艾利斯",
        "ja": "ブエノスアイレス",
        "ms": "Buenos Aires"
    },
    "Sucre": {
        "zh": "苏克雷",
        "ja": "スクレ",
        "ms": "Sucre"
    },
    "La Paz": {
        "zh": "拉巴斯",
        "ja": "ラパス",
        "ms": "La Paz"
    },
    "Brasilia": {
        "zh": "巴西利亚",
        "ja": "ブラジリア",
        "ms": "Brasilia"
    },
    "Santiago": {
        "zh": "圣地亚哥",
        "ja": "サンティアゴ",
        "ms": "Santiago"
    },
    "Bogota": {
        "zh": "波哥大",
        "ja": "ボゴタ",
        "ms": "Bogota"
    },
    "Quito": {
        "zh": "基多",
        "ja": "キト",
        "ms": "Quito"
    },
    "Georgetown": {
        "zh": "乔治敦",
        "ja": "ジョージタウン",
        "ms": "Georgetown"
    },
    "Asuncion": {
        "zh": "亚松森",
        "ja": "アスンシオン",
        "ms": "Asuncion"
    },
    "Lima": {
        "zh": "利马",
        "ja": "リマ",
        "ms": "Lima"
    },
    "Paramaribo": {
        "zh": "帕拉马里博",
        "ja": "パラマリボ",
        "ms": "Paramaribo"
    },
    "Montevideo": {
        "zh": "蒙得维的亚",
        "ja": "モンテビデオ",
        "ms": "Montevideo"
    },
    "Caracas": {
        "zh": "加拉加斯",
        "ja": "カラカス",
        "ms": "Caracas"
    },
    "Havana": {
        "zh": "哈瓦那",
        "ja": "ハバナ",
        "ms": "Havana"
    },
    "Kingston": {
        "zh": "金斯敦",
        "ja": "キングストン",
        "ms": "Kingston"
    },
    "Santo Domingo": {
        "zh": "圣多明各",
        "ja": "サントドミンゴ",
        "ms": "Santo Domingo"
    },
    "Port-au-Prince": {
        "zh": "太子港",
        "ja": "ポルトープランス",
        "ms": "Port-au-Prince"
    },
    "Nassau": {
        "zh": "拿骚",
        "ja": "ナッソー",
        "ms": "Nassau"
    },
    "Bridgetown": {
        "zh": "布里奇敦",
        "ja": "ブリッジタウン",
        "ms": "Bridgetown"
    },
    "Algiers": {
        "zh": "阿尔及尔",
        "ja": "アルジェ",
        "ms": "Algiers"
    },
    "Luanda": {
        "zh": "罗安达",
        "ja": "ルアンダ",
        "ms": "Luanda"
    },
    "Porto-Novo": {
        "zh": "波多诺伏",
        "ja": "ポルトノボ",
        "ms": "Porto-Novo"
    },
    "Gaborone": {
        "zh": "哈博罗内",
        "ja": "ハボローネ",
        "ms": "Gaborone"
    },
    "Ouagadougou": {
        "zh": "瓦加杜古",
        "ja": "ワガドゥグー",
        "ms": "Ouagadougou"
    },
    "Gitega": {
        "zh": "基特加",
        "ja": "ギテガ",
        "ms": "Gitega"
    },
    "Yaounde": {
        "zh": "雅温得",
        "ja": "ヤウンデ",
        "ms": "Yaounde"
    },
    "Praia": {
        "zh": "普拉亚",
        "ja": "プライア",
        "ms": "Praia"
    },
    "Bangui": {
        "zh": "班吉",
        "ja": "バンギ",
        "ms": "Bangui"
    },
    "N'Djamena": {
        "zh": "恩贾梅纳",
        "ja": "ンジャメナ",
        "ms": "N'Djamena"
    },
    "Moroni": {
        "zh": "莫罗尼",
        "ja": "モロニ",
        "ms": "Moroni"
    },
    "Brazzaville": {
        "zh": "布拉柴维尔",
        "ja": "ブラザビル",
        "ms": "Brazzaville"
    },
    "Kinshasa": {
        "zh": "金沙萨",
        "ja": "キンシャサ",
        "ms": "Kinshasa"
    },
    "Djibouti": {
        "zh": "吉布提",
        "ja": "ジブチ",
        "ms": "Djibouti"
    },
    "Cairo": {
        "zh": "开罗",
        "ja": "カイロ",
        "ms": "Kaherah"
    },
    "Malabo": {
        "zh": "马拉博",
        "ja": "マラボ",
        "ms": "Malabo"
    },
    "Asmara": {
        "zh": "阿斯马拉",
        "ja": "アスマラ",
        "ms": "Asmara"
    },
    "Addis Ababa": {
        "zh": "亚的斯亚贝巴",
        "ja": "アディスアベバ",
        "ms": "Addis Ababa"
    },
    "Libreville": {
        "zh": "利伯维尔",
        "ja": "リーブルビル",
        "ms": "Libreville"
    },
    "Banjul": {
        "zh": "班珠尔",
        "ja": "バンジュール",
        "ms": "Banjul"
    },
    "Accra": {
        "zh": "阿克拉",
        "ja": "アクラ",
        "ms": "Accra"
    },
    "Conakry": {
        "zh": "科纳克里",
        "ja": "コナクリ",
        "ms": "Conakry"
    },
    "Bissau": {
        "zh": "比绍",
        "ja": "ビサウ",
        "ms": "Bissau"
    },
    "Yamoussoukro": {
        "zh": "亚穆苏克罗",
        "ja": "ヤムスクロ",
        "ms": "Yamoussoukro"
    },
    "Nairobi": {
        "zh": "内罗毕",
        "ja": "ナイロビ",
        "ms": "Nairobi"
    },
    "Maseru": {
        "zh": "马塞卢",
        "ja": "マセル",
        "ms": "Maseru"
    },
    "Monrovia": {
        "zh": "蒙罗维亚",
        "ja": "モンロビア",
        "ms": "Monrovia"
    },
    "Tripoli": {
        "zh": "的黎波里",
        "ja": "トリポリ",
        "ms": "Tripoli"
    },
    "Antananarivo": {
        "zh": "塔那那利佛",
        "ja": "アンタナナリボ",
        "ms": "Antananarivo"
    },
    "Lilongwe": {
        "zh": "利隆圭",
        "ja": "リロングウェ",
        "ms": "Lilongwe"
    },
    "Bamako": {
        "zh": "巴马科",
        "ja": "バマコ",
        "ms": "Bamako"
    },
    "Nouakchott": {
        "zh": "努瓦克肖特",
        "ja": "ヌアクショット",
        "ms": "Nouakchott"
    },
    "Port Louis": {
        "zh": "路易港",
        "ja": "ポートルイス",
        "ms": "Port Louis"
    },
    "Rabat": {
        "zh": "拉巴特",
        "ja": "ラバト",
        "ms": "Rabat"
    },
    "Maputo": {
        "zh": "马普托",
        "ja": "マプト",
        "ms": "Maputo"
    },
    "Windhoek": {
        "zh": "温得和克",
        "ja": "ウィントフック",
        "ms": "Windhoek"
    },
    "Niamey": {
        "zh": "尼亚美",
        "ja": "ニアメ",
        "ms": "Niamey"
    },
    "Abuja": {
        "zh": "阿布贾",
        "ja": "アブジャ",
        "ms": "Abuja"
    },
    "Kigali": {
        "zh": "基加利",
        "ja": "キガリ",
        "ms": "Kigali"
    },
    "Dakar": {
        "zh": "达喀尔",
        "ja": "ダカール",
        "ms": "Dakar"
    },
    "Victoria": {
        "zh": "维多利亚",
        "ja": "ビクトリア",
        "ms": "Victoria"
    },
    "Freetown": {
        "zh": "弗里敦",
        "ja": "フリータウン",
        "ms": "Freetown"
    },
    "Mogadishu": {
        "zh": "摩加迪沙",
        "ja": "モガディシュ",
        "ms": "Mogadishu"
    },
    "Pretoria": {
        "zh": "比勒陀利亚",
        "ja": "プレトリア",
        "ms": "Pretoria"
    },
    "Cape Town": {
        "zh": "开普敦",
        "ja": "ケープタウン",
        "ms": "Cape Town"
    },
    "Juba": {
        "zh": "朱巴",
        "ja": "ジュバ",
        "ms": "Juba"
    },
    "Khartoum": {
        "zh": "喀土穆",
        "ja": "ハルツーム",
        "ms": "Khartoum"
    },
    "Dodoma": {
        "zh": "多多马",
        "ja": "ドドマ",
        "ms": "Dodoma"
    },
    "Lome": {
        "zh": "洛美",
        "ja": "ロメ",
        "ms": "Lome"
    },
    "Tunis": {
        "zh": "突尼斯",
        "ja": "チュニス",
        "ms": "Tunis"
    },
    "Kampala": {
        "zh": "坎帕拉",
        "ja": "カンパラ",
        "ms": "Kampala"
    },
    "Lusaka": {
        "zh": "卢萨卡",
        "ja": "ルサカ",
        "ms": "Lusaka"
    },
    "Harare": {
        "zh": "哈拉雷",
        "ja": "ハラレ",
        "ms": "Harare"
    },
    "Shanghai": {
        "zh": "上海",
        "ja": "上海",
        "ms": "Shanghai"
    },
    "Guangzhou": {
        "zh": "广州",
        "ja": "広州",
        "ms": "Guangzhou"
    },
    "Shenzhen": {
        "zh": "深圳",
        "ja": "深セン",
        "ms": "Shenzhen"
    },
    "Chengdu": {
        "zh": "成都",
        "ja": "成都",
        "ms": "Chengdu"
    },
    "Hangzhou": {
        "zh": "杭州",
        "ja": "杭州",
        "ms": "Hangzhou"
    },
    "Wuhan": {
        "zh": "武汉",
        "ja": "武漢",
        "ms": "Wuhan"
    },
    "Xi'an": {
        "zh": "西安",
        "ja": "西安",
        "ms": "Xi'an"
    },
    "Chongqing": {
        "zh": "重庆",
        "ja": "重慶",
        "ms": "Chongqing"
    },
    "Tianjin": {
        "zh": "天津",
        "ja": "天津",
        "ms": "Tianjin"
    },
    "Nanjing": {
        "zh": "南京",
        "ja": "南京",
        "ms": "Nanjing"
    },
    "Hong Kong": {
        "zh": "香港",
        "ja": "香港",
        "ms": "Hong Kong"
    },
    "Macau": {
        "zh": "澳门",
        "ja": "マカオ",
        "ms": "Macau"
    },
    "Taipei": {
        "zh": "台北",
        "ja": "台北",
        "ms": "Taipei"
    },
    "Kaohsiung": {
        "zh": "高雄",
        "ja": "高雄",
        "ms": "Kaohsiung"
    },
    "Yokohama": {
        "zh": "横滨",
        "ja": "横浜",
        "ms": "Yokohama"
    },
    "Osaka": {
        "zh": "大阪",
        "ja": "大阪",
        "ms": "Osaka"
    },
    "Nagoya": {
        "zh": "名古屋",
        "ja": "名古屋",
        "ms": "Nagoya"
    },
    "Sapporo": {
        "zh": "札幌",
        "ja": "札幌",
        "ms": "Sapporo"
    },
    "Kobe": {
        "zh": "神户",
        "ja": "神戸",
        "ms": "Kobe"
    },
    "Kyoto": {
        "zh": "京都",
        "ja": "京都",
        "ms": "Kyoto"
    },
    "Fukuoka": {
        "zh": "福冈",
        "ja": "福岡",
        "ms": "Fukuoka"
    },
    "Hiroshima": {
        "zh": "广岛",
        "ja": "広島",
        "ms": "Hiroshima"
    },
    "Sendai": {
        "zh": "仙台",
        "ja": "仙台",
        "ms": "Sendai"
    },
    "Okinawa": {
        "zh": "冲绳",
        "ja": "沖縄",
        "ms": "Okinawa"
    },
    "New York": {
        "zh": "纽约",
        "ja": "ニューヨーク",
        "ms": "New York"
    },
    "Los Angeles": {
        "zh": "洛杉矶",
        "ja": "ロサンゼルス",
        "ms": "Los Angeles"
    },
    "Chicago": {
        "zh": "芝加哥",
        "ja": "シカゴ",
        "ms": "Chicago"
    },
    "Houston": {
        "zh": "休斯敦",
        "ja": "ヒューストン",
        "ms": "Houston"
    },
    "San Francisco": {
        "zh": "旧金山",
        "ja": "サンフランシスコ",
        "ms": "San Francisco"
    },
    "Seattle": {
        "zh": "西雅图",
        "ja": "シアトル",
        "ms": "Seattle"
    },
    "Boston": {
        "zh": "波士顿",
        "ja": "ボストン",
        "ms": "Boston"
    },
    "Miami": {
        "zh": "迈阿密",
        "ja": "マイアミ",
        "ms": "Miami"
    },
    "Las Vegas": {
        "zh": "拉斯维加斯",
        "ja": "ラスベガス",
        "ms": "Las Vegas"
    },
    "Toronto": {
        "zh": "多伦多",
        "ja": "トロント",
        "ms": "Toronto"
    },
    "Vancouver": {
        "zh": "温哥华",
        "ja": "バンクーバー",
        "ms": "Vancouver"
    },
    "Montreal": {
        "zh": "蒙特利尔",
        "ja": "モントリオール",
        "ms": "Montreal"
    },
    "Sydney": {
        "zh": "悉尼",
        "ja": "シドニー",
        "ms": "Sydney"
    },
    "Melbourne": {
        "zh": "墨尔本",
        "ja": "メルボルン",
        "ms": "Melbourne"
    },
    "Brisbane": {
        "zh": "布里斯班",
        "ja": "ブリスベン",
        "ms": "Brisbane"
    },
    "Perth": {
        "zh": "珀斯",
        "ja": "パース",
        "ms": "Perth"
    },
    "Auckland": {
        "zh": "奥克兰",
        "ja": "オークランド",
        "ms": "Auckland"
    },
    "Penang": {
        "zh": "槟城",
        "ja": "ペナン",
        "ms": "Pulau Pinang"
    },
    "George Town": {
        "zh": "乔治市",
        "ja": "ジョージタウン",
        "ms": "George Town"
    },
    "Johor Bahru": {
        "zh": "新山",
        "ja": "ジョホールバル",
        "ms": "Johor Bahru"
    },
    "Ipoh": {
        "zh": "怡保",
        "ja": "イポー",
        "ms": "Ipoh"
    },
    "Kuching": {
        "zh": "古晋",
        "ja": "クチン",
        "ms": "Kuching"
    },
    "Kota Kinabalu": {
        "zh": "亚庇",
        "ja": "コタキナバル",
        "ms": "Kota Kinabalu"
    },
    "Shah Alam": {
        "zh": "莎阿南",
        "ja": "シャー・アラム",
        "ms": "Shah Alam"
    },
    "Petaling Jaya": {
        "zh": "八打灵再也",
        "ja": "ペタリンジャヤ",
        "ms": "Petaling Jaya"
    },
    "Melaka": {
        "zh": "马六甲",
        "ja": "マラッカ",
        "ms": "Melaka"
    },
    "Alor Setar": {
        "zh": "亚罗士打",
        "ja": "アロースター",
        "ms": "Alor Setar"
    },
    "Kuantan": {
        "zh": "关丹",
        "ja": "クアンタン",
        "ms": "Kuantan"
    },
    "Kota Bharu": {
        "zh": "哥打峇鲁",
        "ja": "コタバル",
        "ms": "Kota Bharu"
    },
    "Kuala Terengganu": {
        "zh": "瓜拉登嘉楼",
        "ja": "クアラ・トレンガヌ",
        "ms": "Kuala Terengganu"
    },
    "Seremban": {
        "zh": "芙蓉",
        "ja": "スレンバン",
        "ms": "Seremban"
    },
    "Kangar": {
        "zh": "加央",
        "ja": "カンガル",
        "ms": "Kangar"
    },
    "Putrajaya": {
        "zh": "布城",
        "ja": "プトラジャヤ",
        "ms": "Putrajaya"
    },
    "Labuan": {
        "zh": "纳闽",
        "ja": "ラブアン",
        "ms": "Labuan"
    },
    "Miri": {
        "zh": "美里",
        "ja": "ミリ",
        "ms": "Miri"
    },
    "Sibu": {
        "zh": "诗巫",
        "ja": "シブ",
        "ms": "Sibu"
    },
    "Bintulu": {
        "zh": "民都鲁",
        "ja": "ビンツル",
        "ms": "Bintulu"
    },
    "Sandakan": {
        "zh": "山打根",
        "ja": "サンダカン",
        "ms": "Sandakan"
    },
    "Tawau": {
        "zh": "斗湖",
        "ja": "タワウ",
        "ms": "Tawau"
    },
    "Calabar": {
        "zh": "卡拉巴尔",
        "ja": "カラバル",
        "ms": "Calabar"
    },
    "Uyo": {
        "zh": "乌约",
        "ja": "ウヨ",
        "ms": "Uyo"
    },
    "Aba": {
        "zh": "阿巴",
        "ja": "アバ",
        "ms": "Aba"
    },
    "Lagos": {
        "zh": "拉各斯",
        "ja": "ラゴス",
        "ms": "Lagos"
    },
    "Kano": {
        "zh": "卡诺",
        "ja": "カノ",
        "ms": "Kano"
    },
    "Cerro Branco": {
        "zh": "塞罗布兰科",
        "ja": "セロ・ブランコ",
        "ms": "Cerro Branco"
    },
    "Santa Cruz do Sul": {
        "zh": "南圣克鲁斯",
        "ja": "サンタ・クルス・ド・スル",
        "ms": "Santa Cruz do Sul"
    },
    "Sao Paulo": {
        "zh": "圣保罗",
        "ja": "サンパウロ",
        "ms": "Sao Paulo"
    },
    "Rio de Janeiro": {
        "zh": "里约热内卢",
        "ja": "リオデジャネイロ",
        "ms": "Rio de Janeiro"
    },
    "Mumbai": {
        "zh": "孟买",
        "ja": "ムンバイ",
        "ms": "Mumbai"
    },
    "Dubai": {
        "zh": "迪拜",
        "ja": "ドバイ",
        "ms": "Dubai"
    },
    "Ho Chi Minh City": {
        "zh": "胡志明市",
        "ja": "ホーチミン",
        "ms": "Bandar Ho Chi Minh"
    },
    "Surabaya": {
        "zh": "泗水",
        "ja": "スラバヤ",
        "ms": "Surabaya"
    },
    "Manchester": {
        "zh": "曼彻斯特",
        "ja": "マンチェスター",
        "ms": "Manchester"
    },
    "Birmingham": {
        "zh": "伯明翰",
        "ja": "バーミンガム",
        "ms": "Birmingham"
    },
    "Frankfurt": {
        "zh": "法兰克福",
        "ja": "フランクフルト",
        "ms": "Frankfurt"
    },
    "Munich": {
        "zh": "慕尼黑",
        "ja": "ミュンヘン",
        "ms": "Munich"
    },
    "Milan": {
        "zh": "米兰",
        "ja": "ミラノ",
        "ms": "Milan"
    },
    "Barcelona": {
        "zh": "巴塞罗那",
        "ja": "バルセロナ",
        "ms": "Barcelona"
    },
    "Busan": {
        "zh": "釜山",
        "ja": "釜山",
        "ms": "Busan"
    },
    "Incheon": {
        "zh": "仁川",
        "ja": "仁川",
        "ms": "Incheon"
    }
},

    /**
     * States & Provinces Dictionary
     */
    states: {
    "Johor": {
        "zh": "柔佛州",
        "ja": "ジョホール州",
        "ms": "Johor"
    },
    "Kedah": {
        "zh": "吉打州",
        "ja": "ケダ州",
        "ms": "Kedah"
    },
    "Kelantan": {
        "zh": "吉兰丹州",
        "ja": "クランタン州",
        "ms": "Kelantan"
    },
    "Melaka": {
        "zh": "马六甲州",
        "ja": "マラッカ州",
        "ms": "Melaka"
    },
    "Malacca": {
        "zh": "马六甲州",
        "ja": "マラッカ州",
        "ms": "Melaka"
    },
    "Negeri Sembilan": {
        "zh": "森美兰州",
        "ja": "ヌグリ・スンビラン州",
        "ms": "Negeri Sembilan"
    },
    "Pahang": {
        "zh": "彭亨州",
        "ja": "パハン州",
        "ms": "Pahang"
    },
    "Penang": {
        "zh": "槟城州",
        "ja": "ペナン州",
        "ms": "Pulau Pinang"
    },
    "Pulau Pinang": {
        "zh": "槟城州",
        "ja": "ペナン州",
        "ms": "Pulau Pinang"
    },
    "Perak": {
        "zh": "霹雳州",
        "ja": "ペラ州",
        "ms": "Perak"
    },
    "Perlis": {
        "zh": "玻璃市州",
        "ja": "プルリス州",
        "ms": "Perlis"
    },
    "Sabah": {
        "zh": "沙巴州",
        "ja": "サバ州",
        "ms": "Sabah"
    },
    "Sarawak": {
        "zh": "砂拉越州",
        "ja": "サラワク州",
        "ms": "Sarawak"
    },
    "Selangor": {
        "zh": "雪兰莪州",
        "ja": "セランゴール州",
        "ms": "Selangor"
    },
    "Terengganu": {
        "zh": "登嘉楼州",
        "ja": "トレンガヌ州",
        "ms": "Terengganu"
    },
    "Federal Territory of Kuala Lumpur": {
        "zh": "吉隆坡联邦直辖区",
        "ja": "クアラルンプール連邦直轄領",
        "ms": "Wilayah Persekutuan Kuala Lumpur"
    },
    "Kuala Lumpur": {
        "zh": "吉隆坡",
        "ja": "クアラルンプール",
        "ms": "Kuala Lumpur"
    },
    "Federal Territory of Labuan": {
        "zh": "纳闽联邦直辖区",
        "ja": "ラブアン連邦直轄領",
        "ms": "Wilayah Persekutuan Labuan"
    },
    "Labuan": {
        "zh": "纳闽",
        "ja": "ラブアン",
        "ms": "Labuan"
    },
    "Federal Territory of Putrajaya": {
        "zh": "布城联邦直辖区",
        "ja": "プトラジャヤ連邦直轄領",
        "ms": "Wilayah Persekutuan Putrajaya"
    },
    "Putrajaya": {
        "zh": "布城",
        "ja": "プトラジャヤ",
        "ms": "Putrajaya"
    },
    "Anhui": {
        "zh": "安徽省",
        "ja": "安徽省",
        "ms": "Wilayah Anhui"
    },
    "Beijing": {
        "zh": "北京市",
        "ja": "北京市",
        "ms": "Beijing"
    },
    "Chongqing": {
        "zh": "重庆市",
        "ja": "重慶市",
        "ms": "Chongqing"
    },
    "Fujian": {
        "zh": "福建省",
        "ja": "福建省",
        "ms": "Wilayah Fujian"
    },
    "Gansu": {
        "zh": "甘肃省",
        "ja": "甘粛省",
        "ms": "Wilayah Gansu"
    },
    "Guangdong": {
        "zh": "广东省",
        "ja": "広東省",
        "ms": "Wilayah Guangdong"
    },
    "Guangxi": {
        "zh": "广西壮族自治区",
        "ja": "広西チワン族自治区",
        "ms": "Wilayah Autonomi Guangxi"
    },
    "Guizhou": {
        "zh": "贵州省",
        "ja": "貴州省",
        "ms": "Wilayah Guizhou"
    },
    "Hainan": {
        "zh": "海南省",
        "ja": "海南省",
        "ms": "Wilayah Hainan"
    },
    "Hebei": {
        "zh": "河北省",
        "ja": "河北省",
        "ms": "Wilayah Hebei"
    },
    "Heilongjiang": {
        "zh": "黑龙江省",
        "ja": "黒竜江省",
        "ms": "Wilayah Heilongjiang"
    },
    "Henan": {
        "zh": "河南省",
        "ja": "河南省",
        "ms": "Wilayah Henan"
    },
    "Hong Kong": {
        "zh": "香港特别行政区",
        "ja": "香港特別行政区",
        "ms": "Hong Kong"
    },
    "Hong Kong SAR": {
        "zh": "香港特别行政区",
        "ja": "香港特別行政区",
        "ms": "Hong Kong"
    },
    "Hubei": {
        "zh": "湖北省",
        "ja": "湖北省",
        "ms": "Wilayah Hubei"
    },
    "Hunan": {
        "zh": "湖南省",
        "ja": "湖南省",
        "ms": "Wilayah Hunan"
    },
    "Inner Mongolia": {
        "zh": "内蒙古自治区",
        "ja": "内モンゴル自治区",
        "ms": "Mongolia Dalam"
    },
    "Jiangsu": {
        "zh": "江苏省",
        "ja": "江蘇省",
        "ms": "Wilayah Jiangsu"
    },
    "Jiangxi": {
        "zh": "江西省",
        "ja": "江西省",
        "ms": "Wilayah Jiangxi"
    },
    "Jilin": {
        "zh": "吉林省",
        "ja": "吉林省",
        "ms": "Wilayah Jilin"
    },
    "Liaoning": {
        "zh": "辽宁省",
        "ja": "遼寧省",
        "ms": "Wilayah Liaoning"
    },
    "Macau": {
        "zh": "澳门特别行政区",
        "ja": "マカオ特別行政区",
        "ms": "Macau"
    },
    "Macau SAR": {
        "zh": "澳门特别行政区",
        "ja": "マカオ特別行政区",
        "ms": "Macau"
    },
    "Ningxia": {
        "zh": "宁夏回族自治区",
        "ja": "寧夏回族自治区",
        "ms": "Wilayah Ningxia"
    },
    "Qinghai": {
        "zh": "青海省",
        "ja": "青海省",
        "ms": "Wilayah Qinghai"
    },
    "Shaanxi": {
        "zh": "陕西省",
        "ja": "陝西省",
        "ms": "Wilayah Shaanxi"
    },
    "Shandong": {
        "zh": "山东省",
        "ja": "山東省",
        "ms": "Wilayah Shandong"
    },
    "Shanghai": {
        "zh": "上海市",
        "ja": "上海市",
        "ms": "Shanghai"
    },
    "Shanxi": {
        "zh": "山西省",
        "ja": "山西省",
        "ms": "Wilayah Shanxi"
    },
    "Sichuan": {
        "zh": "四川省",
        "ja": "四川省",
        "ms": "Wilayah Sichuan"
    },
    "Taiwan": {
        "zh": "台湾省",
        "ja": "台湾",
        "ms": "Taiwan"
    },
    "Tianjin": {
        "zh": "天津市",
        "ja": "天津市",
        "ms": "Tianjin"
    },
    "Tibet": {
        "zh": "西藏自治区",
        "ja": "チベット自治区",
        "ms": "Tibet"
    },
    "Xinjiang": {
        "zh": "新疆维吾尔自治区",
        "ja": "新疆ウイグル自治区",
        "ms": "Xinjiang"
    },
    "Yunnan": {
        "zh": "云南省",
        "ja": "雲南省",
        "ms": "Wilayah Yunnan"
    },
    "Zhejiang": {
        "zh": "浙江省",
        "ja": "浙江省",
        "ms": "Wilayah Zhejiang"
    },
    "Aichi": {
        "zh": "爱知县",
        "ja": "愛知県",
        "ms": "Wilayah Aichi"
    },
    "Akita": {
        "zh": "秋田县",
        "ja": "秋田県",
        "ms": "Wilayah Akita"
    },
    "Aomori": {
        "zh": "青森县",
        "ja": "青森県",
        "ms": "Wilayah Aomori"
    },
    "Chiba": {
        "zh": "千叶县",
        "ja": "千葉県",
        "ms": "Wilayah Chiba"
    },
    "Ehime": {
        "zh": "爱媛县",
        "ja": "愛媛県",
        "ms": "Wilayah Ehime"
    },
    "Fukui": {
        "zh": "福井县",
        "ja": "福井県",
        "ms": "Wilayah Fukui"
    },
    "Fukuoka": {
        "zh": "福冈县",
        "ja": "福岡県",
        "ms": "Wilayah Fukuoka"
    },
    "Fukushima": {
        "zh": "福岛县",
        "ja": "福島県",
        "ms": "Wilayah Fukushima"
    },
    "Gifu": {
        "zh": "岐阜县",
        "ja": "岐阜県",
        "ms": "Wilayah Gifu"
    },
    "Gunma": {
        "zh": "群马县",
        "ja": "群馬県",
        "ms": "Wilayah Gunma"
    },
    "Hiroshima": {
        "zh": "广岛县",
        "ja": "広島県",
        "ms": "Wilayah Hiroshima"
    },
    "Hokkaido": {
        "zh": "北海道",
        "ja": "北海道",
        "ms": "Hokkaido"
    },
    "Hokkaidō": {
        "zh": "北海道",
        "ja": "北海道",
        "ms": "Hokkaido"
    },
    "Hyogo": {
        "zh": "兵库县",
        "ja": "兵庫県",
        "ms": "Wilayah Hyogo"
    },
    "Hyōgo": {
        "zh": "兵库县",
        "ja": "兵庫県",
        "ms": "Wilayah Hyogo"
    },
    "Ibaraki": {
        "zh": "茨城县",
        "ja": "茨城県",
        "ms": "Wilayah Ibaraki"
    },
    "Ishikawa": {
        "zh": "石川县",
        "ja": "石川県",
        "ms": "Wilayah Ishikawa"
    },
    "Iwate": {
        "zh": "岩手县",
        "ja": "岩手県",
        "ms": "Wilayah Iwate"
    },
    "Kagawa": {
        "zh": "香川县",
        "ja": "香川県",
        "ms": "Wilayah Kagawa"
    },
    "Kagoshima": {
        "zh": "鹿儿岛县",
        "ja": "鹿児島県",
        "ms": "Wilayah Kagoshima"
    },
    "Kanagawa": {
        "zh": "神奈川县",
        "ja": "神奈川県",
        "ms": "Wilayah Kanagawa"
    },
    "Kochi": {
        "zh": "高知县",
        "ja": "高知県",
        "ms": "Wilayah Kochi"
    },
    "Kōchi": {
        "zh": "高知县",
        "ja": "高知県",
        "ms": "Wilayah Kochi"
    },
    "Kumamoto": {
        "zh": "熊本县",
        "ja": "熊本県",
        "ms": "Wilayah Kumamoto"
    },
    "Kyoto": {
        "zh": "京都府",
        "ja": "京都府",
        "ms": "Kyoto"
    },
    "Kyōto": {
        "zh": "京都府",
        "ja": "京都府",
        "ms": "Kyoto"
    },
    "Mie": {
        "zh": "三重县",
        "ja": "三重県",
        "ms": "Wilayah Mie"
    },
    "Miyagi": {
        "zh": "宫城县",
        "ja": "宮城県",
        "ms": "Wilayah Miyagi"
    },
    "Miyazaki": {
        "zh": "宫崎县",
        "ja": "宮崎県",
        "ms": "Wilayah Miyazaki"
    },
    "Nagano": {
        "zh": "长野县",
        "ja": "長野県",
        "ms": "Wilayah Nagano"
    },
    "Nagasaki": {
        "zh": "长崎县",
        "ja": "長崎県",
        "ms": "Wilayah Nagasaki"
    },
    "Nara": {
        "zh": "奈良县",
        "ja": "奈良県",
        "ms": "Wilayah Nara"
    },
    "Niigata": {
        "zh": "新潟县",
        "ja": "新潟県",
        "ms": "Wilayah Niigata"
    },
    "Oita": {
        "zh": "大分县",
        "ja": "大分県",
        "ms": "Wilayah Oita"
    },
    "Ōita": {
        "zh": "大分县",
        "ja": "大分県",
        "ms": "Wilayah Oita"
    },
    "Okayama": {
        "zh": "冈山县",
        "ja": "岡山県",
        "ms": "Wilayah Okayama"
    },
    "Okinawa": {
        "zh": "冲绳县",
        "ja": "沖縄県",
        "ms": "Wilayah Okinawa"
    },
    "Osaka": {
        "zh": "大阪府",
        "ja": "大阪府",
        "ms": "Osaka"
    },
    "Ōsaka": {
        "zh": "大阪府",
        "ja": "大阪府",
        "ms": "Osaka"
    },
    "Saga": {
        "zh": "佐贺县",
        "ja": "佐賀県",
        "ms": "Wilayah Saga"
    },
    "Saitama": {
        "zh": "埼玉县",
        "ja": "埼玉県",
        "ms": "Wilayah Saitama"
    },
    "Shiga": {
        "zh": "滋贺县",
        "ja": "滋賀県",
        "ms": "Wilayah Shiga"
    },
    "Shimane": {
        "zh": "岛根县",
        "ja": "島根県",
        "ms": "Wilayah Shimane"
    },
    "Shizuoka": {
        "zh": "静冈县",
        "ja": "静岡県",
        "ms": "Wilayah Shizuoka"
    },
    "Tochigi": {
        "zh": "枥木县",
        "ja": "栃木県",
        "ms": "Wilayah Tochigi"
    },
    "Tokushima": {
        "zh": "德岛县",
        "ja": "徳島県",
        "ms": "Wilayah Tokushima"
    },
    "Tokyo": {
        "zh": "东京都",
        "ja": "東京都",
        "ms": "Tokyo"
    },
    "Tottori": {
        "zh": "鸟取县",
        "ja": "鳥取県",
        "ms": "Wilayah Tottori"
    },
    "Toyama": {
        "zh": "富山县",
        "ja": "富山県",
        "ms": "Wilayah Toyama"
    },
    "Wakayama": {
        "zh": "和歌山县",
        "ja": "和歌山県",
        "ms": "Wilayah Wakayama"
    },
    "Yamagata": {
        "zh": "山形县",
        "ja": "山形県",
        "ms": "Wilayah Yamagata"
    },
    "Yamaguchi": {
        "zh": "山口县",
        "ja": "山口県",
        "ms": "Wilayah Yamaguchi"
    },
    "Yamanashi": {
        "zh": "山梨县",
        "ja": "山梨県",
        "ms": "Wilayah Yamanashi"
    },
    "Alabama": {
        "zh": "亚拉巴马州",
        "ja": "アラバマ州",
        "ms": "Alabama"
    },
    "Alaska": {
        "zh": "阿拉斯加州",
        "ja": "アラスカ州",
        "ms": "Alaska"
    },
    "Arizona": {
        "zh": "亚利桑那州",
        "ja": "アリゾナ州",
        "ms": "Arizona"
    },
    "Arkansas": {
        "zh": "阿肯色州",
        "ja": "アーカンソー州",
        "ms": "Arkansas"
    },
    "California": {
        "zh": "加利福尼亚州",
        "ja": "カリフォルニア州",
        "ms": "California"
    },
    "Colorado": {
        "zh": "科罗拉多州",
        "ja": "コロラド州",
        "ms": "Colorado"
    },
    "Connecticut": {
        "zh": "康涅狄格州",
        "ja": "コネチカット州",
        "ms": "Connecticut"
    },
    "Delaware": {
        "zh": "特拉华州",
        "ja": "デラウェア州",
        "ms": "Delaware"
    },
    "District of Columbia": {
        "zh": "华盛顿哥伦比亚特区",
        "ja": "ワシントンD.C.",
        "ms": "Daerah Columbia"
    },
    "Florida": {
        "zh": "佛罗里达州",
        "ja": "フロリダ州",
        "ms": "Florida"
    },
    "Georgia": {
        "zh": "佐治亚州",
        "ja": "ジョージア州",
        "ms": "Georgia"
    },
    "Hawaii": {
        "zh": "夏威夷州",
        "ja": "ハワイ州",
        "ms": "Hawaii"
    },
    "Idaho": {
        "zh": "爱达荷州",
        "ja": "アイダホ州",
        "ms": "Idaho"
    },
    "Illinois": {
        "zh": "伊利诺伊州",
        "ja": "イリノイ州",
        "ms": "Illinois"
    },
    "Indiana": {
        "zh": "印第安纳州",
        "ja": "インディアナ州",
        "ms": "Indiana"
    },
    "Iowa": {
        "zh": "艾奥瓦州",
        "ja": "アイオワ州",
        "ms": "Iowa"
    },
    "Kansas": {
        "zh": "堪萨斯州",
        "ja": "カンザス州",
        "ms": "Kansas"
    },
    "Kentucky": {
        "zh": "肯塔基州",
        "ja": "ケンタッキー州",
        "ms": "Kentucky"
    },
    "Louisiana": {
        "zh": "路易斯安那州",
        "ja": "ルイジアナ州",
        "ms": "Louisiana"
    },
    "Maine": {
        "zh": "缅因州",
        "ja": "メイン州",
        "ms": "Maine"
    },
    "Maryland": {
        "zh": "马里兰州",
        "ja": "メリーランド州",
        "ms": "Maryland"
    },
    "Massachusetts": {
        "zh": "马萨诸塞州",
        "ja": "マサチューセッツ州",
        "ms": "Massachusetts"
    },
    "Michigan": {
        "zh": "密歇根州",
        "ja": "ミシガン州",
        "ms": "Michigan"
    },
    "Minnesota": {
        "zh": "明尼苏达州",
        "ja": "ミネソタ州",
        "ms": "Minnesota"
    },
    "Mississippi": {
        "zh": "密西西比州",
        "ja": "ミシシッピ州",
        "ms": "Mississippi"
    },
    "Missouri": {
        "zh": "密苏里州",
        "ja": "ミズーリ州",
        "ms": "Missouri"
    },
    "Montana": {
        "zh": "蒙大拿州",
        "ja": "モンタナ州",
        "ms": "Montana"
    },
    "Nebraska": {
        "zh": "内布拉斯加州",
        "ja": "ネブラスカ州",
        "ms": "Nebraska"
    },
    "Nevada": {
        "zh": "内华达州",
        "ja": "ネバダ州",
        "ms": "Nevada"
    },
    "New Hampshire": {
        "zh": "新罕布什尔州",
        "ja": "ニューハンプシャー州",
        "ms": "New Hampshire"
    },
    "New Jersey": {
        "zh": "新泽西州",
        "ja": "ニュージャージー州",
        "ms": "New Jersey"
    },
    "New Mexico": {
        "zh": "新墨西哥州",
        "ja": "ニューメキシコ州",
        "ms": "New Mexico"
    },
    "New York": {
        "zh": "纽约州",
        "ja": "ニューヨーク州",
        "ms": "New York"
    },
    "North Carolina": {
        "zh": "北卡罗来纳州",
        "ja": "ノースカロライナ州",
        "ms": "North Carolina"
    },
    "North Dakota": {
        "zh": "北达科他州",
        "ja": "ノースダコタ州",
        "ms": "North Dakota"
    },
    "Ohio": {
        "zh": "俄亥俄州",
        "ja": "オハイオ州",
        "ms": "Ohio"
    },
    "Oklahoma": {
        "zh": "俄克拉何马州",
        "ja": "オクラホマ州",
        "ms": "Oklahoma"
    },
    "Oregon": {
        "zh": "俄勒冈州",
        "ja": "オレゴン州",
        "ms": "Oregon"
    },
    "Pennsylvania": {
        "zh": "宾夕法尼亚州",
        "ja": "ペンシルベニア州",
        "ms": "Pennsylvania"
    },
    "Rhode Island": {
        "zh": "罗德岛州",
        "ja": "ロードアイランド州",
        "ms": "Rhode Island"
    },
    "South Carolina": {
        "zh": "南卡罗来纳州",
        "ja": "サウスカロライナ州",
        "ms": "South Carolina"
    },
    "South Dakota": {
        "zh": "南达科他州",
        "ja": "サウスダコタ州",
        "ms": "South Dakota"
    },
    "Tennessee": {
        "zh": "田纳西州",
        "ja": "テネシー州",
        "ms": "Tennessee"
    },
    "Texas": {
        "zh": "得克萨斯州",
        "ja": "テキサス州",
        "ms": "Texas"
    },
    "Utah": {
        "zh": "犹他州",
        "ja": "ユタ州",
        "ms": "Utah"
    },
    "Vermont": {
        "zh": "佛蒙特州",
        "ja": "バーモント州",
        "ms": "Vermont"
    },
    "Virginia": {
        "zh": "弗吉尼亚州",
        "ja": "バージニア州",
        "ms": "Virginia"
    },
    "Washington": {
        "zh": "华盛顿州",
        "ja": "ワシントン州",
        "ms": "Washington"
    },
    "West Virginia": {
        "zh": "西弗吉尼亚州",
        "ja": "ウェストバージニア州",
        "ms": "West Virginia"
    },
    "Wisconsin": {
        "zh": "威斯康星州",
        "ja": "ウィスコンシン州",
        "ms": "Wisconsin"
    },
    "Wyoming": {
        "zh": "怀俄明州",
        "ja": "ワイオミング州",
        "ms": "Wyoming"
    },
    "Puerto Rico": {
        "zh": "波多黎各",
        "ja": "プエルトリコ",
        "ms": "Puerto Rico"
    },
    "Guam": {
        "zh": "关岛",
        "ja": "グアム",
        "ms": "Guam"
    },
    "Ontario": {
        "zh": "安大略省",
        "ja": "オンタリオ州",
        "ms": "Ontario"
    },
    "Quebec": {
        "zh": "魁北克省",
        "ja": "ケベック州",
        "ms": "Quebec"
    },
    "British Columbia": {
        "zh": "不列颠哥伦比亚省",
        "ja": "ブリティッシュコロンビア州",
        "ms": "British Columbia"
    },
    "Alberta": {
        "zh": "阿尔伯塔省",
        "ja": "アルバータ州",
        "ms": "Alberta"
    },
    "Manitoba": {
        "zh": "曼尼托巴省",
        "ja": "マニトバ州",
        "ms": "Manitoba"
    },
    "Saskatchewan": {
        "zh": "萨斯喀彻温省",
        "ja": "サスカチュワン州",
        "ms": "Saskatchewan"
    },
    "Nova Scotia": {
        "zh": "新斯科舍省",
        "ja": "ノバスコシア州",
        "ms": "Nova Scotia"
    },
    "New Brunswick": {
        "zh": "新不伦瑞克省",
        "ja": "ニューブランズウィック州",
        "ms": "New Brunswick"
    },
    "Newfoundland and Labrador": {
        "zh": "纽芬兰与拉布拉多省",
        "ja": "ニューファンドランド・ラブラドール州",
        "ms": "Newfoundland and Labrador"
    },
    "Prince Edward Island": {
        "zh": "爱德华王子岛省",
        "ja": "プリンスエドワードアイランド州",
        "ms": "Prince Edward Island"
    },
    "Northwest Territories": {
        "zh": "西北地区",
        "ja": "ノースウエスト準州",
        "ms": "Wilayah Barat Laut"
    },
    "Nunavut": {
        "zh": "努纳武特地区",
        "ja": "ヌナブト準州",
        "ms": "Nunavut"
    },
    "Yukon": {
        "zh": "育空地区",
        "ja": "ユーコン準州",
        "ms": "Yukon"
    },
    "New South Wales": {
        "zh": "新南威尔士州",
        "ja": "ニューサウスウェールズ州",
        "ms": "New South Wales"
    },
    "Victoria": {
        "zh": "维多利亚州",
        "ja": "ビクトリア州",
        "ms": "Victoria"
    },
    "Queensland": {
        "zh": "昆士兰州",
        "ja": "クイーンズランド州",
        "ms": "Queensland"
    },
    "Western Australia": {
        "zh": "西澳大利亚州",
        "ja": "西オーストラリア州",
        "ms": "Australia Barat"
    },
    "South Australia": {
        "zh": "南澳大利亚州",
        "ja": "南オーストラリア州",
        "ms": "Australia Selatan"
    },
    "Tasmania": {
        "zh": "塔斯马尼亚州",
        "ja": "タスマニア州",
        "ms": "Tasmania"
    },
    "Australian Capital Territory": {
        "zh": "澳大利亚首都领地",
        "ja": "オーストラリア首都特別地域",
        "ms": "Wilayah Ibu Kota Australia"
    },
    "Northern Territory": {
        "zh": "北领地",
        "ja": "ノーザンテリトリー",
        "ms": "Wilayah Utara"
    },
    "Seoul": {
        "zh": "首尔特别市",
        "ja": "ソウル特別市",
        "ms": "Seoul"
    },
    "Busan": {
        "zh": "釜山广域市",
        "ja": "釜山広域市",
        "ms": "Busan"
    },
    "Daegu": {
        "zh": "大邱广域市",
        "ja": "大邱広域市",
        "ms": "Daegu"
    },
    "Incheon": {
        "zh": "仁川广域市",
        "ja": "仁川広域市",
        "ms": "Incheon"
    },
    "Gwangju": {
        "zh": "光州广域市",
        "ja": "光州広域市",
        "ms": "Gwangju"
    },
    "Daejeon": {
        "zh": "大田广域市",
        "ja": "大田広域市",
        "ms": "Daejeon"
    },
    "Ulsan": {
        "zh": "蔚山广域市",
        "ja": "蔚山広域市",
        "ms": "Ulsan"
    },
    "Sejong City": {
        "zh": "世宗特别自治市",
        "ja": "世宗特別自治市",
        "ms": "Bandar Sejong"
    },
    "Gyeonggi": {
        "zh": "京畿道",
        "ja": "京畿道",
        "ms": "Gyeonggi"
    },
    "Gangwon": {
        "zh": "江原道",
        "ja": "江原道",
        "ms": "Gangwon"
    },
    "North Chungcheong": {
        "zh": "忠清北道",
        "ja": "忠清北道",
        "ms": "Chungcheong Utara"
    },
    "South Chungcheong": {
        "zh": "忠清南道",
        "ja": "忠清南道",
        "ms": "Chungcheong Selatan"
    },
    "North Jeolla": {
        "zh": "全罗北道",
        "ja": "全羅北道",
        "ms": "Jeolla Utara"
    },
    "South Jeolla": {
        "zh": "全罗南道",
        "ja": "全羅南道",
        "ms": "Jeolla Selatan"
    },
    "North Gyeongsang": {
        "zh": "庆尚北道",
        "ja": "慶尚北道",
        "ms": "Gyeongsang Utara"
    },
    "South Gyeongsang": {
        "zh": "庆尚南道",
        "ja": "慶尚南道",
        "ms": "Gyeongsang Selatan"
    },
    "Jeju": {
        "zh": "济州特别自治道",
        "ja": "済州特別自治道",
        "ms": "Jeju"
    },
    "England": {
        "zh": "英格兰",
        "ja": "イングランド",
        "ms": "England"
    },
    "Scotland": {
        "zh": "苏格兰",
        "ja": "スコットランド",
        "ms": "Scotland"
    },
    "Wales": {
        "zh": "威尔士",
        "ja": "ウェールズ",
        "ms": "Wales"
    },
    "Northern Ireland": {
        "zh": "北爱尔兰",
        "ja": "北アイルランド",
        "ms": "Ireland Utara"
    },
    "Bavaria": {
        "zh": "巴伐利亚州",
        "ja": "バイエルン州",
        "ms": "Bavaria"
    },
    "Berlin": {
        "zh": "柏林州",
        "ja": "ベルリン",
        "ms": "Berlin"
    },
    "North Rhine-Westphalia": {
        "zh": "北莱茵-威斯特法伦州",
        "ja": "ノルトライン＝ヴェストファーレン州",
        "ms": "North Rhine-Westphalia"
    },
    "Cross River": {
        "zh": "克罗斯河州",
        "ja": "クロスリバー州",
        "ms": "Cross River"
    },
    "Cross River State": {
        "zh": "克罗斯河州",
        "ja": "クロスリバー州",
        "ms": "Cross River"
    },
    "Akwa Ibom": {
        "zh": "阿夸伊博姆州",
        "ja": "アクワ・イボム州",
        "ms": "Akwa Ibom"
    },
    "Rio Grande do Sul": {
        "zh": "南里奥格兰德州",
        "ja": "リオグランデ・ド・スル州",
        "ms": "Rio Grande do Sul"
    },
    "Sao Paulo": {
        "zh": "圣保罗州",
        "ja": "サンパウロ州",
        "ms": "Sao Paulo"
    },
    "São Paulo": {
        "zh": "圣保罗州",
        "ja": "サンパウロ州",
        "ms": "Sao Paulo"
    },
    "Rio de Janeiro": {
        "zh": "里约热内卢州",
        "ja": "リオデジャネイロ州",
        "ms": "Rio de Janeiro"
    }
},

    /**
     * Translate Country name by ISO code or country name
     * Uses browser Intl.DisplayNames API with dictionary fallback
     * @param {string} countryCodeOrName 
     * @param {string} fallbackName 
     * @returns {string}
     */
    getCountryName(countryCodeOrName, fallbackName = '') {
        if (!countryCodeOrName && !fallbackName) return '';
        const raw = (countryCodeOrName || fallbackName || '').trim();
        if (!raw) return '';

        // Check if English name in countryNameToCode
        let code = '';
        if (raw.length === 2) {
            code = raw.toUpperCase();
        } else {
            const lower = raw.toLowerCase();
            code = this.countryNameToCode[lower] || '';
            if (!code && fallbackName) {
                code = this.countryNameToCode[fallbackName.toLowerCase().trim()] || '';
            }
        }

        // Try Intl.DisplayNames if code found
        if (code) {
            try {
                const localeMap = { zh: 'zh-CN', ja: 'ja-JP', ms: 'ms-MY', en: 'en-US' };
                const locale = localeMap[this.currentLang] || 'en-US';
                const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
                const translated = displayNames.of(code);
                if (translated && translated !== code) {
                    return translated;
                }
            } catch (e) {
                // Fall through to dictionary
            }

            // Check direct fallback dictionary
            if (this.countryFallback[code] && this.countryFallback[code][this.currentLang]) {
                return this.countryFallback[code][this.currentLang];
            }
        }

        return fallbackName || countryCodeOrName || '';
    },

    /**
     * Translate city name
     * Supports exact match, normalized accents/macrons, and suffix stripping
     * @param {string} cityName 
     * @returns {string}
     */
    getCityName(cityName) {
        if (!cityName) return '';
        const raw = cityName.trim();
        if (this.currentLang === 'en') return raw;

        // 1. Direct match
        if (this.cities[raw] && this.cities[raw][this.currentLang]) {
            return this.cities[raw][this.currentLang];
        }

        // 2. Normalized match (strip accents/macrons e.g. Kyōto, Hokkaidō, São Paulo, Montréal)
        const norm = this.normalize(raw);
        if (this.cities[norm] && this.cities[norm][this.currentLang]) {
            return this.cities[norm][this.currentLang];
        }

        // 3. Suffix stripped match (e.g. "Washington, D.C." -> "Washington", "New York City" -> "New York")
        const stripped = norm.replace(/(,\s*D\.C\.|,\s*DC|\s+City)$/i, '').trim();
        if (stripped !== norm && this.cities[stripped] && this.cities[stripped][this.currentLang]) {
            return this.cities[stripped][this.currentLang];
        }

        return cityName;
    },

    /**
     * Translate state / province name
     * Supports exact match, normalized accents, and suffix stripping
     * @param {string} stateName 
     * @returns {string}
     */
    getStateName(stateName) {
        if (!stateName) return '';
        const raw = stateName.trim();
        if (this.currentLang === 'en') return raw;

        // 1. Direct match
        if (this.states[raw] && this.states[raw][this.currentLang]) {
            return this.states[raw][this.currentLang];
        }

        // 2. Normalized match
        const norm = this.normalize(raw);
        if (this.states[norm] && this.states[norm][this.currentLang]) {
            return this.states[norm][this.currentLang];
        }

        // 3. Suffix stripped match (e.g. "Cross River State" -> "Cross River", "Guangdong Province" -> "Guangdong")
        const stripped = norm.replace(/\s+(State|Province|Prefecture|Region|Department|Division)$/i, '').trim();
        if (stripped !== norm && this.states[stripped] && this.states[stripped][this.currentLang]) {
            return this.states[stripped][this.currentLang];
        }

        return stateName;
    }
};

// Export to window
window.I18N = I18N;