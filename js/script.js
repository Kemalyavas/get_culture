// script.js

const culturalFacts = [
    "Türk kahvesi, UNESCO tarafından Somut Olmayan Kültürel Miras olarak kabul edilmiştir.",
    "Antik Roma'da ölümcül gladyatör dövüşleri, genellikle halk için eğlence olarak düzenlenirdi.",
    "Van Gogh, hayatı boyunca sadece bir tablo satabildi: Kırmızı Üzüm Bağı. 🎨🖼️",
    "Shakespeare'in oyunlarında ortalama 30.000 farklı kelime kullandığı tahmin ediliyor. ✍️📖",
    "Mona Lisa'nın kaşları yoktur çünkü o dönemde kadınlar kaşlarını tıraş ederdi. 🤔",
    "Antik Romalılar, dişlerini temizlemek için bazen idrar kullanırdı. 🏛️😳",
    "Piramitler köleler tarafından değil, ücretli işçiler tarafından inşa edilmiştir. 👷‍♂️",
    "Ahtapotların üç kalbi vardır. 🐙 ❤️❤️❤️",
    "İnsan DNA'sının yarısı muz DNA'sı ile aynıdır. 🧬🍌",
    "Bal, bozulmayan tek gıdadır. Arkeologlar binlerce yıllık ballar bulmuşlardır. 🍯🏺",
    "Venüs gezegeni, Güneş Sistemi'nde saat yönünde dönen tek gezegendir. 🪐🔄",
    "Kanada'nın göl sayısı, dünyanın geri kalanındaki tüm göllerin toplamından fazladır. 💧",
    "Bir insan hayatı boyunca ortalama 8 filin ağırlığına denk gelen besin tüketir. 🧍🐘🍎",
    "Parmak izleri gibi, herkesin dil izi de benzersizdir. 👅",
    "Dünyadaki tüm karıncaların toplam ağırlığı, tüm insanların toplam ağırlığına yakındır. 🐜⚖️🧍",
    "Bir devekuşunun gözü beyninden daha büyüktür. 👁️🧠",
    "Satürn gezegeninde elmas yağdığı düşünülüyor. 🪐💎",
    "Ketçap, 19. yüzyılda bir süre ilaç olarak satıldı. 🥫💊",
    "Bir sümüklü böcek art arda üç yıl uyuyabilir. 🐌💤🗓️",
    "Flamingolar yemek yemek için kafalarını ters çevirmek zorundadır. 🦩🙃",
    "Teknik olarak beyaz çikolata, gerçek çikolata değildir çünkü kakao katılarını içermez. 🍫❌🤓",
    "Havuçlar ilk yetiştirildiğinde mor renkteydi, turuncu değil. 🥕💜",
    "Midenizdeki asit, ustura bıçağını bile eritecek kadar güçlüdür. 🦠🔪💪",
    "Kangurular geriye doğru yürüyemez. 🦘🔙❌",
    "Klavyenizdeki F ve J harflerinin üzerindeki küçük çıkıntılar, parmaklarınızı doğru yere yerleştirerek bakmadan yazmayı (on parmak) kolaylaştırmak içindir. ⌨️👆",
    "Güneş uzaydan bakıldığında aslında beyaz renkte görünür; atmosferimiz onu sarı gösterir. ☀️🚀⚪",
    "Ortalama bir insan günde yaklaşık 50 ila 100 tel saç kaybeder. 🧍‍♀️💇‍♀️⬇️",
    "Çikolata, Aztekler ve Mayalar tarafından hem değerli bir içecek hem de bir tür para birimi olarak kullanılıyordu. 🍫💰🇲🇽",
    "Uyurken beyniniz, uyanık olduğunuzdan daha aktif olabilir. 😴🧠⚡️",
    "Gözleriniz açıkken hapşırmanız fiziksel olarak imkansızdır. 👃🚫",
    "Bir istiridyenin içindeki inci, aslında istiridyenin içine giren bir parazit veya tahriş edici maddeye karşı oluşturduğu bir savunma mekanizmasıdır. 🐚🛡️",
    "Buzdolabının icadından önce, insanlar yiyeceklerini soğuk tutmak için 'buz adamlar'dan buz blokları satın alırlardı. 🧊👨‍🦳➡️🧊",
    "Eğer Dünya'nın tüm tarihi 24 saate sıkıştırılsaydı, insanoğlu son birkaç saniyede ortaya çıkardı. ⏳🌍🚶‍♂️",
    "Bir hapşırık, ağzınızdan yaklaşık 160 kilometre/saat hızla fırlayabilir. 🤧💨🚀",
    "Dünyanın en uzun yer adı, Yeni Zelanda'da bulunan ve 85 harften oluşan bir tepenin adıdır: Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu. 🏞️📜✍️"
];

let clickCount = 0;
const maxClicks = 3;
// Gösterilen bilgileri takip etmek için bir dizi ekleyelim
let shownFactIndices = [];

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("factButton");
    const factDisplay = document.getElementById("factDisplay");
    const counterDisplay = document.getElementById("counterDisplay");

    // Önceki günün son gösterilen bilgisini takip etmek için yeni değişken
    let lastDayFact = -1;

    if (localStorage.getItem("lastDayFact")) {
        lastDayFact = parseInt(localStorage.getItem("lastDayFact"));
    }

    // Check if we have stored click count in localStorage
    if (localStorage.getItem("clickCount")) {
        clickCount = parseInt(localStorage.getItem("clickCount"));

        // Hak sayısı maxClicks'ten büyükse, sınırla
        if (clickCount > maxClicks) {
            clickCount = maxClicks;
            localStorage.setItem("clickCount", clickCount);
        }

        // Check if it's a new day
        const lastClickDate = localStorage.getItem("lastClickDate");
        const today = new Date().toDateString();

        if (lastClickDate !== today) {
            // Yeni gün başlamadan önce, önceki günün son gösterdiği bilgi indeksini kaydet
            if (shownFactIndices.length > 0) {
                lastDayFact = shownFactIndices[shownFactIndices.length - 1];
                localStorage.setItem("lastDayFact", lastDayFact);
            }

            clickCount = 0;
            // Yeni gün başladığında gösterilen bilgileri sıfırla
            shownFactIndices = [];
            localStorage.setItem("shownFactIndices", JSON.stringify(shownFactIndices));
            localStorage.setItem("lastClickDate", today);
            localStorage.setItem("clickCount", clickCount);
        } else {
            // Aynı gün içerisinde daha önce gösterilen bilgileri yükleyelim
            try {
                const savedIndices = localStorage.getItem("shownFactIndices");
                if (savedIndices) {
                    shownFactIndices = JSON.parse(savedIndices);
                }
            } catch (e) {
                // JSON parse hatası durumunda boş dizi ile devam edelim
                shownFactIndices = [];
            }
        }
    } else {
        localStorage.setItem("clickCount", clickCount);
        localStorage.setItem("lastClickDate", new Date().toDateString());
        localStorage.setItem("shownFactIndices", JSON.stringify(shownFactIndices));
    }

    // Update counter display
    updateCounter();

    button.addEventListener("click", () => {
        if (clickCount < maxClicks) {
            // Tüm bilgiler gösterilmişse diziyi sıfırla
            if (shownFactIndices.length >= culturalFacts.length) {
                shownFactIndices = [];
            }

            // Henüz gösterilmemiş bilgilerden bir rastgele seçim yap
            let availableIndices = [];
            for (let i = 0; i < culturalFacts.length; i++) {
                // Hem bu gün gösterilmemiş hem de dünün son bilgisi olmayanları ekle
                if (!shownFactIndices.includes(i) && i !== lastDayFact) {
                    availableIndices.push(i);
                }
            }

            // Eğer hiç uygun bilgi bulunamazsa (sadece dünün son bilgisi kalmışsa) onu da ekle
            if (availableIndices.length === 0 && !shownFactIndices.includes(lastDayFact)) {
                availableIndices.push(lastDayFact);
            }

            const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            factDisplay.textContent = culturalFacts[randomIndex];

            // Gösterilen bilgiyi takip dizisine ekle
            shownFactIndices.push(randomIndex);
            localStorage.setItem("shownFactIndices", JSON.stringify(shownFactIndices));

            clickCount++;
            localStorage.setItem("clickCount", clickCount);
            updateCounter();
        } else {
            factDisplay.innerHTML = "<strong>Günlük maksimum bilgi hakkına ulaştınız.</strong><br>Yarın tekrar bekleriz!";
        }
    });

    function updateCounter() {
        counterDisplay.textContent = `Kalan hak: ${maxClicks - clickCount}/${maxClicks}`;
    }
});