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
            calendarSection.style.display = "block";
            calendarSection.scrollIntoView({ behavior: "smooth" });
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
    // 7. チームコンセプトクリックでメッセージ表示
    // -------------------------
    const conceptTrigger = document.getElementById("team-concept");
    if (conceptTrigger) {
        let step = 0;
        const messages = [
            "🌟 明るく！楽しく！仲間と共に成長するチーム 🌟",
            "💡 協力して挑戦することを大切にしています",
            "😊 みんなで支え合い、楽しむことがモットーです"
        ];

        const msgBox = document.createElement("p");
        msgBox.style.marginTop = "10px";
        msgBox.style.fontWeight = "bold";
        msgBox.style.fontSize = "1.2em"; // 少し大きめ
        msgBox.style.color = "#006";
        conceptTrigger.insertAdjacentElement("afterend", msgBox);

        conceptTrigger.style.cursor = "pointer";

        conceptTrigger.addEventListener("click", () => {
            msgBox.textContent = messages[step];
            step = (step + 1) % messages.length;
        });
    }
    // -------------------------
    // 8. メンバーの雰囲気クリックでメッセージ表示
     
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

    // 各項目のメッセージ配列
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
    document.getElementById("open-calendar").addEventListener("click", function() {
    document.getElementById("calendar-section").style.display = "block";
    document.getElementById("video-gallery").style.display = "none"; // 他を隠す
    });

    document.getElementById("open-video").addEventListener("click", function() {
    document.getElementById("video-gallery").style.display = "block";
    document.getElementById("calendar-section").style.display = "none"; // 他を隠す
    });

    // ---------------------------
    // 美味い飯スライドショー
    // ---------------------------
    document.querySelector(".cards .card:nth-child(5)").addEventListener("click", () => {
        document.getElementById("gourmet-section").style.display = "block";
        loadGourmetSlider();
    });

    // 画像データ（店名 / メニュー / コメント）
    const gourmetData = [
        { img: "images/gourmet1.jpg", shop: "とんかつ檍", menu: "とんかつ定食", comment: "林SP🐷蒲田本店" },
        { img: "images/gourmet2.jpg", shop: "ひも", menu: "ひもかわ冷", comment: "群馬名物ひもかわ" },
        { img: "images/gourmet3.jpg", shop: "店名３", menu: "メニュー３", comment: "身体にいいラーメン" },
        { img: "images/gourmet4.jpg", shop: "ラーメン潤", menu: "メニュー４", comment: "新潟背油岩ノリ" },
        { img: "images/gourmet5.jpg", shop: "ラーメン飛粋", menu: "得ラーメン", comment: "上品な家系" },
        { img: "images/gourmet6.jpg", shop: "店名６", menu: "メニュー６", comment: "コメント６" }
    ];

    let gourmetIndex = 0;

    function loadGourmetSlider() {
        const slider = document.getElementById("gourmetSlider");
        slider.innerHTML = "";

        gourmetData.forEach(item => {
            slider.innerHTML += `
                <div class="gourmet-item">
                    <img src="${item.img}">
                    <div class="gourmet-text">
                        <p><b>${item.shop}</b></p>
                        <p>${item.menu}</p>
                        <p>${item.comment}</p>
                    </div>
                </div>
            `;
        });

        startGourmetSlide();
    }

    function startGourmetSlide() {
        const slider = document.getElementById("gourmetSlider");
        const itemWidth = 340; // 画像＋間隔
        setInterval(() => {
            gourmetIndex++;
            if (gourmetIndex >= gourmetData.length) gourmetIndex = 0;
            slider.style.transform = `translateX(-${gourmetIndex * itemWidth}px)`;
        }, 3000);
    }
});

