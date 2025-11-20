// script.js
console.log("勉強用サイトが読み込まれました！");

document.addEventListener("DOMContentLoaded", () => {
    console.log("script loaded");

    // -------------------------
    // 1. スムーズスクロール
    // -------------------------
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
    // -------------------------
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('active', window.scrollY > 50);
        });
    }

    // -------------------------
    // 3. スクロールふわっと表示
    // -------------------------
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.section, .hero, .card, .my-photo').forEach(el => {
        observer.observe(el);
    });

    // -------------------------
    // 4. カレンダー表示
    // -------------------------
    const calendarBtn = document.getElementById("open-calendar");
    const calendarSection = document.getElementById("calendar-section");
    if (calendarBtn && calendarSection) {
        calendarBtn.addEventListener("click", () => {
            showSection("calendar-section");
        });
    }

    // -------------------------
    // 5. 画像拡大モーダル
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

    const modalImg = document.createElement('img');
    modalImg.style.cssText = `
        max-width:90%;
        max-height:80%;
        border-radius:10px;
        box-shadow:0 2px 8px rgba(0,0,0,0.6);
    `;

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

    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);

    document.querySelectorAll('img:not(.logo-img)').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            if (!img.src) return;
            modalImg.src = img.src;
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
        });
    });

    const hideModal = () => {
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
        modalImg.src = '';
    };

    modal.addEventListener('click', hideModal);
    closeBtn.addEventListener('click', e => {
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
            "ほんとうに知りたい？",
            "ほんとうにほんとうに？",
            "知っても後悔しないなら、もう一度押してくれ",
            "実はGPTで考えました(笑)"
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
        "😊 みんなで支え合い、楽しむことがモットーです"
    ]);

    setupClickableMessage("member-atmosphere", [
        "😊 メンバーは明るく協力的です",
        "🤝 チームワークを大切にしています",
        "🎉 みんなで楽しみながら成長しています"
    ]);

    setupClickableMessage("main-activity", [
        "⚽ 主にフットサル活動を行います",
        "🏆 大会や練習試合にも参加しています",
        "📅 定期的に練習スケジュールがあります"
    ]);

    setupClickableMessage("notes", [
        "⚠️ 活動に参加する際は安全に注意してください",
        "⏰ 遅刻や欠席の連絡は必ずお願いします",
        "📌 貴重品の管理は各自でお願いします"
    ]);

    // -----------------------------------
    // カード ごとの表示切替
    // -----------------------------------
    const showSection = (id) => {
        const sections = ["calendar-section", "play-photo-section", "video-gallery", "gourmet-section", "activity-log-section"];
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
    document.getElementById("open-gourmet")?.addEventListener("click", () => {
        showSection("gourmet-section");
        setupInfiniteSlider("gourmetSlider", [
            { img:"images/gourmet1.jpg", shop:"とんかつ檍", menu:"特ロースかつ定食", comment:"林SP蒲田本店" },
            { img:"images/gourmet2.jpg", shop:"花山うどん", menu:"ざる二味", comment:"群馬名物ひもかわ" },
            { img:"images/gourmet3.jpg", shop:"鶏ポタラーメンTHANK", menu:"ラーメンぽてりRich", comment:"鶏肉と野菜のポタージュの健康ラーメン" },
            { img:"images/gourmet4.jpg", shop:"ラーメン潤", menu:"得ラーメン", comment:"新潟系背油いっぱい岩ノリ" },
            { img:"images/gourmet5.jpg", shop:"ラーメン飛粋", menu:"特製ラーメン", comment:"上品な家系" },
            { img:"images/gourmet6.jpg", shop:"新橋ニューともちんラーメン", menu:"中華そば", comment:"懐かしい、やさしいお味" }
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
});
