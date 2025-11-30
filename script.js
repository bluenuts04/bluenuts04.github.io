// script.js
console.log("勉強用サイトが読み込まれました！");

document.addEventListener("DOMContentLoaded", () => {
    console.log("script loaded");

    // -------------------------
    // 1. スムーズスクロール
    // -------------------------
      // a[href^="#"] = ページ内リンクだけ取得
      // クリックしたらその位置までゆっくりスクロール(ヘッダー内のABOUT等選択すると、そのブロックへ移行)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // -------------------------
    // 2. ヘッダー縮小
     // 50px以上スクロールすると .active を追加 → ヘッダーが縮む
    // -------------------------
     
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('active', window.scrollY > 50);
        });
    }
    // ハンバーガー メニュー
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // -------------------------
    // 3. スクロールふわっと表示
     // 画面に入ったら .show を付けてフェードイン
    // -------------------------
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.12 });// 画面の12%見えたら発火
     // ふわっと表示させる対象一覧
    document.querySelectorAll('.section, .hero, .card, .my-photo').forEach(el => {
        observer.observe(el);
    });

    // -------------------------
    // 4. カレンダー表示（カードクリック）
    // -------------------------
    const calendarBtn = document.getElementById("open-calendar");
    const calendarSection = document.getElementById("calendar-section");
    if (calendarBtn && calendarSection) {
        calendarBtn.addEventListener("click", () => {
            showSection("calendar-section");// 後ろの共通関数で表示切替
        });
    }

    // -------------------------
    // 5. 画像拡大モーダル（クリックした画像をフルスクリーンに表示）
    // -------------------------
    const modal = document.createElement('div');
    modal.id = 'img-modal';
    modal.style.cssText = `
        display:none;
        visibility:hidden;
        position:fixed;
        z-index:1200;
        left:0; top:0;
        width:100%; height:100%;
        background-color:rgba(0,0,0,0.85);
        justify-content:center;
        align-items:center;
    `;
     // モーダル内に表示する画像
    const modalImg = document.createElement('img');
    modalImg.style.cssText = `
        max-width:90%;
        max-height:80%;
        border-radius:10px;
        box-shadow:0 2px 8px rgba(0,0,0,0.6);
    `;
     // 閉じるボタン（×）
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        position:absolute;
        top:20px;
        right:28px;
        font-size:36px;
        color:white;
        cursor:pointer;
        z-index:1300;
        user-select:none;
    `;
     // モーダルに画像と×ボタンを追加
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
     // 全ての画像に「クリック→モーダル表示」を適用（ロゴ除く）
    document.querySelectorAll('img:not(.logo-img)').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            if (!img.src) return;
            modalImg.src = img.src;// モーダルに画像設定
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
        });
    });
      // 閉じる動作
    const hideModal = () => {
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
        modalImg.src = '';
    };
     // 背景クリックでも閉じる
    modal.addEventListener('click', hideModal);
    closeBtn.addEventListener('click', e => {// × を押した時（イベント伝播停止で誤爆防止）
        e.stopPropagation();
        hideModal();
    });

    // -------------------------
    // 6. チーム名クリックメッセージ＋画像表示
    // -------------------------
    const teamName = document.getElementById("team-name");
    if (teamName) {
        let step = 0;
        const messages = [
            "知りたいの？",
            "ほんとうに知りたい？",
            "ほんとうのほんとうに？",
            "知っても後悔しない？",
            "OK。もう一回押して",
            ""
        ];

        const msgBox = document.createElement("p");
        msgBox.style.marginTop = "10px";
        msgBox.style.fontWeight = "bold";
        msgBox.style.fontSize = "1.2em";
        msgBox.style.color = "#a00";
        teamName.insertAdjacentElement("afterend", msgBox);

        const img = document.createElement("img");
        img.src = "images/secret.jpg";
        img.alt = "チーム名の由来";
        img.style.display = "none";
        img.style.margin = "10px auto";
        img.style.maxWidth = "300px";
        teamName.insertAdjacentElement("afterend", img);

        teamName.style.cursor = "pointer";

        teamName.addEventListener("click", () => {
            if (step < messages.length - 1) {
                msgBox.textContent = messages[step];
                img.style.display = "none";
                step++;
            } else if (step === messages.length - 1) {
                msgBox.textContent = messages[step];
                img.style.display = "block";
                step++;
            } else {
                msgBox.textContent = "";
                img.style.display = "none";
                step = 0;
            }
        });
    }

    // -------------------------
    // 7. team-concept / member-atmosphere / main-activity / notes
    // -------------------------
    const setupClickableMessage = (id, messages, color="#006") => {
        const trigger = document.getElementById(id);
        if (!trigger) return;

        let step = 0;
        const msgBox = document.createElement("p");
        msgBox.style.marginTop = "10px";
        msgBox.style.fontWeight = "bold";
        msgBox.style.fontSize = "1.2em";
        msgBox.style.color = color;
        trigger.insertAdjacentElement("afterend", msgBox);

        trigger.style.cursor = "pointer";
        trigger.addEventListener("click", () => {
            msgBox.textContent = messages[step];
            step = (step + 1) % messages.length;
        });
    };

    setupClickableMessage("team-concept", [
        "🌟 明るく！楽しく！仲間と共に成長するチーム 🌟",
        "💡 協力して挑戦することを大切にしています",
        "😊 みんなで支え合い、楽しむことがモットーです",
        ""
    ]);

    setupClickableMessage("member-atmosphere", [
        "😊 メンバーは明るく協力的です",
        "🤝 初心者から経験者、20～40代です",
        "🎉 みんなで楽しみながら成長しています",
        ""
    ]);

    setupClickableMessage("main-activity", [
        "⚽ 主にフットサル活動を行います",
        "🏆 大会や練習試合にも参加しています",
        "📅 定期的に練習スケジュールがあります",
        ""
    ]);

    setupClickableMessage("notes", [
        "⚠️ 活動に参加する際は安全に注意してください",
        "⏰ 遅刻や欠席の連絡は必ずお願いします",
        "📌 貴重品の管理は各自でお願いします",
        ""
    ]);

    // -----------------------------------
    // カード ごとの表示切替
    // -----------------------------------
    const showSection = (id) => {
        const sections = ["calendar-section", "play-photo-section", "video-gallery", "tactics-section","technic-section","gourmet-section", "activity-log-section"];
        sections.forEach(s => document.getElementById(s).style.display = s === id ? "block" : "none");
        // 自動スクロール
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    document.getElementById("open-video")?.addEventListener("click", () => showSection("video-gallery"));
    document.getElementById("open-activity-log")?.addEventListener("click", () => showSection("activity-log-section"));
    document.getElementById("open-play-photo")?.addEventListener("click", () => {
        showSection("play-photo-section");
        setupInfiniteSlider("photoSlider", [
            { img:"images/play1.jpg" },
            { img:"images/play2.jpg" },
            { img:"images/play3.jpg" },
            { img:"images/play4.jpg" }
        ], "photoPrev", "photoNext");
    });



// ------------------ 戦術 ------------------
document.getElementById("open-tactics")?.addEventListener("click", () => {
    showSection("tactics-section");
    showFloatingTactics();
});

function showFloatingTactics() {
    const display = document.getElementById("tactics-display");
    const keywords = ["アラ","フィクソ","ピヴォ","ゴレイロ","1-2-1","2-2","3-1","点を取る","守り切る","ボックス","ダイヤモンド","根性","パス＆ゴー"];

    display.innerHTML = "";
    const displayWidth = display.clientWidth;
    const displayHeight = display.clientHeight;

    keywords.forEach(text => {
        const span = document.createElement("span");
        span.textContent = text;
        span.className = "tactic-word";

        const colors = ["#e74c3c","#3498db","#2ecc71","#f39c12","#9b59b6","#313031ff","#561cd1ff"];
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
        span.style.fontSize = (16 + Math.random()*16) + "px";
        span.style.left = Math.random() * (displayWidth - 50) + "px";
        span.style.top = Math.random() * (displayHeight - 30) + "px";
        span.style.animationDuration = (4 + Math.random()*4) + "s";

        display.appendChild(span);
    });
}

// ------------------ テクニック ------------------
document.getElementById("open-technic")?.addEventListener("click", () => {
    showSection("technic-section");
    showFloatingTechnic();
});

function showFloatingTechnic() {
    const display = document.getElementById("technic-display");
    const keywords = ["シュート","インステップキック","アウトサイドキック","インフロントキック","トーキック","チップキック","スタート＆ストップ","シザース","アーリクロス","ヒールリフト","キックフェイント","ラボーナ"];

    display.innerHTML = "";
    const displayWidth = display.clientWidth;
    const displayHeight = display.clientHeight;

    keywords.forEach(text => {
        const span = document.createElement("span");
        span.textContent = text;
        span.className = "technic-word";

        const colors = ["#e74c3c","#9cd0f3ff","#d33bcbff","#f39c12","#1c0ee3ff","#313031ff","#0fcd62ff"];
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
        span.style.fontSize = (16 + Math.random()*16) + "px";
        span.style.left = Math.random() * (displayWidth - 50) + "px";
        span.style.top = Math.random() * (displayHeight - 30) + "px";
        span.style.animationDuration = (4 + Math.random()*4) + "s";

        display.appendChild(span);
    });
}

    
    
    
    
    
    
    document.getElementById("open-gourmet")?.addEventListener("click", () => {
        showSection("gourmet-section");
        setupInfiniteSlider("gourmetSlider", [
            { img:"images/gourmet1.jpg", shop:"とんかつ檍", menu:"特ロースかつ定食", comment:"林SP蒲田本店", adress:"大田区蒲田５丁目４３−７", hp:"https://tonkatsu-aoki.chom/" },
            { img:"images/gourmet2.jpg", shop:"花山うどん", menu:"ざる二味", comment:"群馬名物ひもかわ", adress:"大田区羽田空港 (第3ターミナル直結施設内)" , hp:"https://www.hanayamaudon.co.jp/" },
            { img:"images/gourmet3.jpg", shop:"鶏ポタラーメンTHANK", menu:"ラーメンぽてりRich", comment:"鶏肉と野菜のポタージュの健康ラーメン" , adress:"大田区蒲田5-43-6", hp:"https://thanktank.jp/toripota"},
            { img:"images/gourmet4.jpg", shop:"ラーメン潤", menu:"得ラーメン", comment:"新潟系背油いっぱい岩ノリ" , adress:"大田区蒲田5-20-7 シャトー蒲田13-102", hp:"https://gbct700.gorp.jp/"},
            { img:"images/gourmet5.jpg", shop:"ラーメン飛粋", menu:"特製ラーメン", comment:"上品な家系", adress:"大田区矢口1-16-24", hp:"https://hiiki.co.jp/" },
            { img:"images/gourmet6.jpg", shop:"新橋ニューともちんラーメン", menu:"中華そば", comment:"懐かしい、やさしいお味", adress:"大田区西蒲田７丁目２−６ 第二醍醐ビル", hp:"https://chan-noren-kumiai.com/"}
        ], "gourmetPrev", "gourmetNext");
    });

    
    // ===================================
    //  8. 無限ループスライダー共通関数
    // ===================================
    function setupInfiniteSlider(sliderId, data, prevId, nextId) {
        const slider = document.getElementById(sliderId);
        const prev = document.getElementById(prevId);
        const next = document.getElementById(nextId);
        if (!slider || !data.length) return;

        slider.innerHTML = "";
        let index = 1;
        let timer = null;

        const createItem = (item) => {
            const div = document.createElement("div");
            div.className = sliderId.includes("gourmet") ? "gourmet-item" : "photo-item";
            if (item.shop) { // グルメ
                div.innerHTML = `
                    <img src="${item.img}">
                    <div class="gourmet-text">
                        <p><b>${item.shop}</b></p>
                        <p>${item.menu}</p>
                        <p>${item.comment}</p>
                        <p class="adress">    <!-- 住所：Googleマップで開く -->
                         <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.adress)}" target="_blank">
                         ${item.adress}</p>
                         </a>
                        </p>
                            <!-- 公式HP：直接リンク -->
                        <p class="hp">
                         <a href="${item.hp}" target="_blank">公式HP</a>
                        </p>
                    </div>
                `;
            } else { // プレイ写真
                div.innerHTML = `<img src="${item.img}">`;
            }
            return div;
        };

        // クローン
        slider.appendChild(createItem(data[data.length-1]));
        data.forEach(d => slider.appendChild(createItem(d)));
        slider.appendChild(createItem(data[0]));

        const getItemWidth = () => {
            const item = slider.querySelector(sliderId.includes("gourmet") ? ".gourmet-item" : ".photo-item");
            const style = getComputedStyle(item);
            return item.getBoundingClientRect().width + parseFloat(style.marginRight);
        };

        const moveToIndex = i => {
            const width = getItemWidth();
            slider.style.transition = "transform 0.8s ease";
            slider.style.transform = `translateX(-${i * width}px)`;
        };

        const nextSlide = () => {
            index++;
            moveToIndex(index);
            setTimeout(() => {
                if (index === data.length + 1) {
                    slider.style.transition = "none";
                    index = 1;
                    slider.offsetWidth; // 強制リフロー
                    moveToIndex(index);
                }
            }, 820);
        };

        const prevSlide = () => {
            index--;
            moveToIndex(index);
            setTimeout(() => {
                if (index === 0) {
                    slider.style.transition = "none";
                    index = data.length;
                    slider.offsetWidth;
                    moveToIndex(index);
                }
            }, 820);
        };

        prev?.addEventListener("click", prevSlide);
        next?.addEventListener("click", nextSlide);

        // タッチ
        let startX = 0;
        slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
        slider.addEventListener("touchend", e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (diff > 30) nextSlide();
            if (diff < -30) prevSlide();
        });

        // 初期位置
        slider.style.transform = `translateX(-${getItemWidth()}px)`;

        // 自動再生
        timer = setInterval(nextSlide, 3000);
    }
    // =============================
    //  問い合わせフォーム
    // =============================
    // ▼ LINEボタン
    document.getElementById("contactLine").addEventListener("click", function () {
       window.open("https://lin.ee/S4Tg4D6", "_blank");
    });

    // ▼ メールボタン
    document.getElementById("contactMail").addEventListener("click", function () {
       // メールフォームを表示
       document.getElementById("mailFormWrapper").style.display = "block";

       // 自動スクロール（使いやすい）
       document.getElementById("mailFormWrapper").scrollIntoView({
          behavior: "smooth"
        });
    });
});

// =============================
//  多言語切替システム（JP / EN）
// =============================
const translations = {
    jp: {
        hero_title: "ようこそ、Valdio(ヴァルディオ)へ",
        hero_desc: "東京都 大田区 蒲田を拠点としている<br>アマチュアのフットサル集団",

        about: "ABOUT",
        services: "SERVICES",
        product: "PRODUCT",
        contact: "CONTACT",

        notice_title: "📢【お知らせ】",
        contact_name: "名前",
        contact_email: "メール",
        contact_subject: "件名",
        contact_message: "内容",
        contact_send: "送信",

        about_team_name: "チーム名の由来",
        about_team_concept: "チームコンセプト",
        about_member: "メンバーの雰囲気",
        about_activity: "主な活動",
        about_notes: "注意事項",

        services_calendar: "📅スケジュール⚽",
        services_log: "📖活動実績⚽",
        services_video: "📹プレイ動画⚽",
        services_photo: "🖼️プレイ写真⚽",
        services_tactics: "🏃‍♂️戦術⚽",
        services_technic: "👣テクニック集⚽",
        services_gourmet: "大田区グルメ🍚",
        services_alert: "不審者情報🥷"
    },

    en: {
        hero_title: "Welcome to Valdio",
        hero_desc: "An amateur futsal team based in Kamata, Ota-ku, Tokyo",

        about: "ABOUT",
        services: "SERVICES",
        product: "PRODUCT",
        contact: "CONTACT",

        notice_title: "📢[NOTICE]",
        contact_name: "Name",
        contact_email: "Email",
        contact_subject: "Subject",
        contact_message: "Message",
        contact_send: "Send",

        about_team_name: "Origin of the Team Name",
        about_team_concept: "Team Concept",
        about_member: "Team Atmosphere",
        about_activity: "Main Activities",
        about_notes: "Notes",

        services_calendar: "📅Schedule⚽",
        services_log: "📖Activity Log⚽",
        services_video: "📹Play Videos⚽",
        services_photo: "🖼️Play Photos⚽",
        services_tactics: "🏃‍♂️Tactics⚽",
        services_technic: "👣Techniques⚽",
        services_gourmet: "Ota Ward Gourmet🍚",
        services_alert: "Suspicious Person Info🥷"
    }
};

// 言語切替
function switchLang(lang) {
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        el.innerHTML = translations[lang][key];
    });

    // active 表示
    document.getElementById("langJP").classList.toggle("active", lang === "jp");
    document.getElementById("langEN").classList.toggle("active", lang === "en");
}

document.getElementById("langJP").addEventListener("click", () => switchLang("jp"));
document.getElementById("langEN").addEventListener("click", () => switchLang("en"));
