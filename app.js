const sideMenuToggle = document.querySelector("[data-side-menu-toggle]");
const sideMenuClose = document.querySelector("[data-side-menu-close]");
const sideMenu = document.querySelector("[data-side-menu]");
const scrim = document.querySelector("[data-scrim]");
const loginToggle = document.querySelector("[data-login-toggle]");
const loginClose = document.querySelector("[data-login-close]");
const loginPopup = document.querySelector("[data-login-popup]");
const loginForm = document.querySelector("[data-login-form]");

const cartToggle = document.querySelector("[data-cart-toggle]");
const cartClose = document.querySelector("[data-cart-close]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartBody = document.querySelector("[data-cart-body]");
const cartFooter = document.querySelector("[data-cart-footer]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTitleCount = document.querySelector("[data-cart-title-count]");

const wishlistToggle = document.querySelector("[data-wishlist-toggle]");
const wishlistClose = document.querySelector("[data-wishlist-close]");
const wishlistDrawer = document.querySelector("[data-wishlist-drawer]");
const wishlistBody = document.querySelector("[data-wishlist-body]");
const wishlistCount = document.querySelector("[data-wishlist-count]");

const compareToggle = document.querySelector("[data-compare-toggle]");
const compareClose = document.querySelector("[data-compare-close]");
const compareDrawer = document.querySelector("[data-compare-drawer]");
const compareBody = document.querySelector("[data-compare-body]");
const compareCount = document.querySelector("[data-compare-count]");

const themeToggles = [...document.querySelectorAll("[data-theme-toggle]")];
const productGrid = document.querySelector(".product-grid");
const filtersPanel = document.querySelector(".filters");
const filterToggle = document.querySelector("[data-filter-toggle]");
const filterClose = document.querySelector("[data-filter-close]");
const footerPanels = [...document.querySelectorAll(".footer-panel")];
const topSalesTrack = document.querySelector("[data-top-sales-track]");
const topSalesPrev = document.querySelector("[data-top-sales-prev]");
const topSalesNext = document.querySelector("[data-top-sales-next]");
const productDetail = document.querySelector("[data-product-detail]");

let cartItems = [];
let wishlistItems = [];
let compareItems = [];
let selectedProtectionOptions = [];
let protectionStepCompleted = false;

const protectionOptions = [
  {
    key: "warranty-extension",
    title: "Extensão de garantia",
    description: "Prolonga a proteção do equipamento para além da cobertura base. Condições e duração a confirmar antes da contratação.",
  },
  {
    key: "accidental-damage",
    title: "Danos acidentais",
    description: "Proteção pensada para situações inesperadas de utilização, como queda, impacto ou derrame. Sujeito às condições da apólice.",
  },
  {
    key: "theft-protection",
    title: "Roubo",
    description: "Opção para casos de roubo, com validação documental e regras específicas de elegibilidade.",
  },
];

const freeShippingThreshold = 999;
const cartFallbackImage = "./assets/category-cutouts/HYDRA-56i5V2-56R7V4-hyperreal.png";
const productVariants = {
  "RAPTOR-50R5V6": {
    id: "RAPTOR-50R5V6",
    title: "Computer Gaming RAPTOR-50R5V6",
    family: "RAPTOR",
    range: "Entrada",
    description: "RTX 3050 8GB | RYZEN5 5500 | 2 x RAM 8GB DDR4 3200 CL22 | SSD SATA 512GB 550/500",
    image: "https://iapc.pt/images/800x800/4790/Banners-novosite/RAPTOR-50R5V1-1080.png",
    price: 654,
    oldPrice: null,
    status: "Sobre Encomenda | Validar com loja",
    story: [
      "Apresento-lhe o RAPTOR-50R5V6, um computador gaming pensado para quem quer entrar no mundo dos jogos com qualidade e sem complicações. Equipado com a GeForce RTX 3050 de 8GB da INNO3D, esta máquina permite-lhe desfrutar dos seus títulos favoritos em Full HD com ray tracing ativo e tecnologias NVIDIA como o DLSS, garantindo fluidez e detalhe visual.",
      "No coração deste sistema está o processador AMD Ryzen 5 5500, com 6 núcleos e 12 threads, capaz de lidar com jogos e multitarefas diárias sem esforço. A memória DDR4 de 8GB a 3200MHz e o rápido SSD de 512GB proporcionam tempos de carregamento reduzidos e uma resposta imediata ao clique, para uma experiência mais ágil.",
      "A caixa micro ATX com painel em mesh e iluminação ARGB personalizável não só tem um aspeto moderno, como garante um bom fluxo de ar para manter os componentes frescos. Inclui ainda fonte de 550W e garantia. Tudo por 654,00€, uma entrada sólida no gaming.",
    ],
    components: [
      { key: "gpu", label: "Placa Gráfica", shortName: "RTX 3050 8GB", name: "PLACA GRAFICA INNO3D NVD RTX 3050 8GB TWIN X2 GDDR6 BULK", specs: "RTX 3050 8GB · GDDR6 · TWIN X2", image: "" },
      { key: "cpu", label: "Processador", shortName: "RYZEN5 5500", name: "AMD AM4 RYZEN 5 5500 3.6 A 4.2GHZ 19MB 6C12T 65W TRAY MPK", specs: "AM4 · 3.6 A 4.2GHZ · 6C/12T · 65W", image: "" },
      { key: "motherboard", label: "Motherboard", shortName: "A520 MICRO-ATX 2DDR4", name: "A520M-HVS ASROCK, AMD AM4 A520 2DDR4 M.2 GEN3X4 USB 3.2", specs: "A520 · AM4 · 2DDR4 · M.2 GEN3X4 · USB 3.2", image: "" },
      { key: "memory", label: "Memória", shortName: "RAM 8GB DDR4 3200 CL22", name: "2x 8GB DDR4 3200 MEMORIA RAM (1X8GB) CL22 BLUERAY", specs: "16GB total · DDR4 · 3200MHz · CL22", image: "" },
      { key: "storage", label: "Storage 1", shortName: "SSD SATA 512GB 550/500", name: "DISCO SSD 2.5P BLUERAY ULTRA M8V 512GB SATA, MAX 550/500MBPS", specs: "512GB · SATA · 550/500MBPS", image: "" },
      { key: "cooler", label: "Cooler", shortName: "COOLER LOW PROFILE FAN 92 ARGB", name: "COOLER CPU AMD AM4/AM5 DYNAMIC BEARING ARGB", specs: "AM4/AM5 · FAN 92 · ARGB", image: "" },
      { key: "fan", label: "Fan 1", shortName: "KIT FAN ARGB", name: "SLAYER KIT 3X 120 FAN ARGB AURA SYNC PASS-THROUG - BLACK", specs: "3X 120 FAN · ARGB · AURA SYNC", image: "" },
      { key: "case", label: "Caixa", shortName: "CAIXA MICRO ATX MESH PT FONTE 550W", name: "CAIXA MATX NTECH SLAYER RX15 FALCON COM FONTE DE 550W", specs: "Micro ATX · Mesh · Fonte 550W incluída", image: "" },
      { key: "psu", label: "Fonte de Alimentação", shortName: "FONTE 550W INCLUÍDA", name: "FONTE 550W INCLUÍDA NA CAIXA MATX NTECH SLAYER RX15 FALCON", specs: "550W · incluída na caixa", image: "" },
    ],
  },
  "HYDRA-57I5V1": {
    id: "HYDRA-57I5V1",
    title: "Computer Gaming HYDRA-57I5V1",
    family: "HYDRA",
    range: "Intermédio",
    description: "RTX 5070 12GB | I5 14400F | RAM 32GB DDR4 3200 CL16 | SSD NVME 1TB 2500/1800 PCIE4",
    image: "https://iapc.pt/images/800x800/4790/Banners-novosite/HYDRA-57I5V1-1080.png",
    price: 1509,
    oldPrice: null,
    status: "Sobre Encomenda | Validar com loja",
    story: [
      "A HYDRA-57I5V1 é uma máquina pensada para o jogador que quer desempenho sólido sem pagar por exageros. No centro está a GeForce RTX 5070 de 12 GB com arquitetura NVIDIA e 6144 núcleos CUDA, que garante jogos fluídos em 1440p e até 4K em títulos competitivos, com suporte para Ray Tracing e DLSS.",
      "O Intel Core i5-14400F de 14.ª geração, com os seus 10 núcleos e 16 threads até 4.7 GHz, emparelha com 32 GB de RAM DDR4 a 3200 MHz e um SSD NVMe de 1 TB para carregamentos rápidos e multitarefa sem travamentos. É uma base equilibrada que responde bem tanto a jogos como a produtividade.",
      "A caixa ATX com painel mesh e três ventoinhas ARGB assegura um bom fluxo de ar e um visual personalizável. A garantia é de 3 anos para o processador e para o cooler. Tudo isto por 1.509,00 €, uma proposta muito interessante para quem procura um sistema gaming competente e bem configurado.",
    ],
    components: [
      { key: "gpu", label: "Placa Gráfica", shortName: "RTX 5070 12GB", name: "PLACA GRAFICA ASUS NVD RTX 5070 PRIME OC 12GB GDDR7", specs: "RTX 5070 12GB · GDDR7 · PRIME OC", image: "" },
      { key: "cpu", label: "Processador", shortName: "I5 14400F", name: "I5 14400F LGA1700 2.5~4.7GHZ 20MB 6PC+4EC/16T 65/148W TRAY", specs: "LGA1700 · 2.5~4.7GHZ · 20MB · 10C/16T", image: "" },
      { key: "motherboard", label: "Motherboard", shortName: "B760 MICRO-ATX 2DDR4", name: "PRIME B760M-R D4 ASUS 2XDDR4 1XM.2 PCIE4.0 MATX", specs: "B760 · 2XDDR4 · 1XM.2 · PCIE4.0 · MATX", image: "" },
      { key: "memory", label: "Memória", shortName: "RAM 32GB DDR4 3200 CL16", name: "32GB DDR4 3200 MEM RAM (2X16GB) CL16 LEXAR THOR GAMING BLACK", specs: "32GB total · DDR4 · 3200MHz · CL16", image: "" },
      { key: "storage", label: "Storage 1", shortName: "SSD NVME 1TB 2500/1800 PCIE4", name: "DISCO M.2 PCIE3.0 2280 SSD ADATA XPG SX S20G 1TB 2500/1800", specs: "1TB · M.2 2280 · 2500/1800", image: "" },
      { key: "cooler", label: "Cooler", shortName: "COOLER LOW PROFILE FAN 92", name: "COOLER CPU ARCTIC ALPINE 17 LGA1700 FDB PWM", specs: "LGA1700 · FDB PWM · Low Profile", image: "" },
      { key: "fan", label: "Fan 1", shortName: "FAN ARGB", name: "FAN ARGB LED CENTRO 120MM PWM", specs: "120MM · PWM · ARGB", image: "" },
      { key: "case", label: "Caixa", shortName: "CAIXA ATX MESH PT 3X FAN ARGB", name: "CAIXA ATX SLAYER RX23 AIRFLOW2 3X FAN ARGB FRONTAL TEMPERADO", specs: "ATX · Mesh · 3X FAN ARGB · Frontal temperado", image: "" },
      { key: "psu", label: "Fonte de Alimentação", shortName: "PSU BRONZE 650W", name: "EUROTECH FONTE ALIMENTACAO BRONZE BX12-650 650W 35A/12V SR", specs: "Bronze · 650W · 35A/12V", image: "" },
    ],
  },
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function displayProductTitle(title) {
  return String(title || "Produto")
    .replace(/^Computer Gaming\s*-\s*/i, "")
    .trim()
    .toUpperCase();
}

function formatEuroHtml(value) {
  return `${Number(value || 0).toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} &euro;`;
}

function cartSpecsFromProduct(product) {
  return [
    ["Placa Gr&aacute;fica", product.gpu],
    ["Processador", product.cpu],
    ["Mem&oacute;ria", product.ram],
    ["Storage", product.storage],
  ].filter(([, value]) => value && value !== "-");
}

function cartItemKey(item) {
  return [item.title, item.price, item.description, item.gpu, item.cpu, item.ram, item.storage].join("|");
}

function addCartItem(product) {
  const nextItem = { ...product, quantity: Number(product.quantity || 1) };
  const existing = cartItems.find((item) => cartItemKey(item) === cartItemKey(nextItem));
  if (existing) {
    existing.quantity = Number(existing.quantity || 1) + nextItem.quantity;
    cartItems = [...cartItems];
    return;
  }
  cartItems = [...cartItems, nextItem];
}

function cartQuantityTotal() {
  return cartItems.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
}

function cartSubtotal() {
  return cartItems.reduce((sum, item) => sum + parseEuroValue(item.price) * Number(item.quantity || 1), 0);
}

function productFromCard(card) {
  return {
    title: card.querySelector("h3")?.textContent?.trim() || "Produto",
    price: card.querySelector("strong")?.textContent?.trim() || "",
    description: card.querySelector("p")?.textContent?.trim() || "",
    image: card.querySelector("img")?.getAttribute("src") || cartFallbackImage,
    cpu: card.dataset.cpu || "-",
    gpu: card.dataset.gpu || "-",
    ram: card.dataset.ram || "-",
    storage: card.dataset.storage || "-",
    status: card.dataset.status || "-",
  };
}

function parseEuroValue(value) {
  const normalized = String(value || "0")
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  return Number(normalized) || 0;
}

function formatEuroValue(value) {
  return `${Number(value || 0).toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} EUR`;
}

function formatEuroDelta(value) {
  return `+€${Number(value || 0).toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function selectedOptionsFromDetail(detail) {
  const optionsRoot = detail.querySelector("[data-product-options]");
  if (!optionsRoot) return { items: [], total: 0 };

  const items = [...optionsRoot.querySelectorAll("[data-optional-checkbox]:checked")]
    .map((input) => {
      const row = input.closest("[data-optional-item]");
      const selectedName = row?.dataset.optionalSelectedName || input.dataset.optionalName || "Opcional";
      const category = input.dataset.optionalCategory || "";
      const price = Number(row?.dataset.optionalPrice || input.dataset.optionalPrice || 0);
      return {
        name: selectedName,
        category,
        price,
      };
    })
    .filter((item) => item.name && item.price >= 0);

  return {
    items,
    total: items.reduce((sum, item) => sum + item.price, 0),
  };
}

function selectedConfigFromDetail(detail) {
  const builder = detail.querySelector("[data-config-builder]");
  if (!builder) return { items: [], total: 0 };

  const items = [...builder.querySelectorAll("[data-config-choice].is-selected")].map((choice) => ({
    key: choice.dataset.configKey || "",
    name: choice.dataset.configName || "Componente",
    price: Number(choice.dataset.configPrice || 0),
  }));

  return {
    items,
    total: items.reduce((sum, item) => sum + item.price, 0),
  };
}

function priceParts(value) {
  const [euros, cents = "00"] = Number(value || 0)
    .toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .split(",");
  return { euros, cents };
}

function currentProductVariant() {
  if (!document.body.classList.contains("product-v2-body")) return null;
  const params = new URLSearchParams(window.location.search);
  const requested = (params.get("produto") || params.get("product") || params.get("sku") || "").toUpperCase();
  return productVariants[requested] || null;
}

function formatEuroCompact(value) {
  return `${Number(value || 0).toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}€`;
}

function financeLabel(price, months) {
  return `${months}× ${formatEuroCompact(Number(price || 0) / months)} sem juros`;
}

function productComponent(product, key) {
  return product?.components?.find((component) => component.key === key) || null;
}

function setTextContent(target, value) {
  const element = typeof target === "string" ? document.querySelector(target) : target;
  if (element && value !== undefined && value !== null) element.textContent = value;
}

function setImage(target, src, alt = "") {
  const image = typeof target === "string" ? document.querySelector(target) : target;
  if (!image || !src) return;
  image.src = src;
  image.alt = alt;
}

function applyComponentToChoice(choice, component) {
  if (!choice || !component) return;
  const name = component.name || component.shortName || "Componente";
  const shortName = component.shortName || name;
  const specs = component.specs || name;
  choice.hidden = false;
  choice.classList.add("is-selected");
  choice.dataset.configName = name;
  choice.dataset.configShort = shortName;
  choice.dataset.configPrice = "0";
  choice.dataset.configRef = component.ref || "";
  choice.dataset.configImage = component.image || "";
  choice.dataset.configSpecs = specs;
  choice.dataset.configPerformance = component.performance || "Componente incluído na configuração";
  choice.dataset.configFps = component.fps || "";
  choice.querySelector("[data-config-select]")?.setAttribute("aria-checked", "true");
  setTextContent(choice.querySelector(".config-choice__copy strong"), name);
  const smalls = choice.querySelectorAll(".config-choice__copy small");
  setTextContent(smalls[0], `${component.ref ? `Ref. ${component.ref} ` : ""}Incluído componente da configuração`);
  setTextContent(smalls[1], specs);
  setTextContent(choice.querySelector(".config-choice__price strong"), "Incluído");
}

function applyProductVariant() {
  const product = currentProductVariant();
  if (!product || !productDetail) return;

  const priceText = formatEuroValue(product.price);
  const priceCompact = formatEuroCompact(product.price);
  const oldPriceText = product.oldPrice ? `PVPr* ${formatEuroCompact(product.oldPrice)}` : "";
  const coreKeys = ["gpu", "cpu", "memory", "storage"];
  const specByKey = Object.fromEntries(coreKeys.map((key) => [key, productComponent(product, key)?.shortName || ""]));

  document.title = `${product.title} | Eurosys Protótipo`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", product.description);

  productDetail.dataset.title = product.title;
  productDetail.dataset.price = priceText;
  productDetail.dataset.basePrice = String(product.price);
  productDetail.dataset.description = product.description;
  productDetail.dataset.cpu = specByKey.cpu || "-";
  productDetail.dataset.gpu = specByKey.gpu || "-";
  productDetail.dataset.ram = specByKey.memory || "-";
  productDetail.dataset.storage = specByKey.storage || "-";
  productDetail.dataset.status = product.status || "-";

  setTextContent(".product-breadcrumbs strong", `${product.title.slice(0, 24)}...`);
  setImage(".product-gallery__stage img", product.image, product.title);
  const thumbs = document.querySelectorAll(".product-gallery__thumbs button");
  thumbs.forEach((thumb, index) => {
    thumb.hidden = index > 0;
    thumb.classList.toggle("is-active", index === 0);
    if (index === 0) setImage(thumb.querySelector("img"), product.image, "");
  });
  document.querySelectorAll(".product-gallery__dots span").forEach((dot, index) => {
    dot.hidden = index > 0;
    dot.classList.toggle("is-active", index === 0);
  });

  setTextContent(".product-heading--v2 h1", `Computer Gaming ${product.id}`);
  setTextContent(".product-heading--v2 p", product.description);
  setTextContent(".product-heading em", `${product.family} / ${product.range}`);
  setTextContent("#product-title", product.title.toUpperCase());
  setTextContent(".product-heading:not(.product-heading--v2) p", product.description);
  document.querySelectorAll(".product-price-block del, .product-price-row del, .sticky-buy-bar__price del").forEach((element) => {
    element.hidden = !oldPriceText;
    if (oldPriceText) element.textContent = oldPriceText;
  });
  document.querySelectorAll(".sticky-buy-bar__price span").forEach((element) => {
    element.hidden = !product.oldPrice;
    if (product.oldPrice) element.textContent = `Poupa ${formatEuroCompact(product.oldPrice - product.price)}`;
  });

  const financeOptions = [3, 4, 6].map((months) => financeLabel(product.price, months));
  setTextContent("[data-finance-selected]", financeOptions[0]);
  document.querySelectorAll("[data-finance-option]").forEach((button, index) => {
    const months = [3, 4, 6][index];
    const label = financeOptions[index];
    button.dataset.financeOption = label;
    button.setAttribute("aria-selected", String(index === 0));
    setTextContent(button.querySelector("strong"), label.replace(" sem juros", ""));
    setTextContent(button.querySelector("span"), `Sem juros · Total ${priceCompact}`);
  });
  document.querySelectorAll(".product-finance-row span").forEach((element, index) => {
    if (financeOptions[index]) element.textContent = financeOptions[index];
  });

  const story = document.querySelector(".product-v2-story");
  if (story) {
    story.querySelector("h2").textContent = `Descrição da ${product.id}`;
    story.querySelectorAll("p").forEach((paragraph, index) => {
      paragraph.textContent = product.story[index] || "";
      paragraph.hidden = !product.story[index];
    });
  }

  document.querySelectorAll(".sticky-buy-bar img").forEach((image) => setImage(image, product.image, ""));
  setTextContent(".sticky-buy-bar__title", product.title);

  const orderedKeys = ["gpu", "cpu", "motherboard", "memory", "storage", "cooler", "fan", "case", "psu"];
  document.querySelectorAll(".product-v2-tech-card li").forEach((item, index) => {
    const key = orderedKeys[index];
    const component = productComponent(product, key);
    item.hidden = !component;
    if (!component) return;
    const button = item.querySelector("[data-config-spec-detail]");
    const name = component.name || component.shortName;
    const specs = component.specs || name;
    button.dataset.configKey = key;
    button.dataset.configName = name;
    button.dataset.configRef = component.ref || "";
    button.dataset.configSpecs = specs;
    button.dataset.configPerformance = component.performance || "Componente incluído na configuração";
    button.dataset.configFps = component.fps || "";
    button.setAttribute("aria-label", `Ver detalhes de ${component.shortName || component.label}`);
    setTextContent(item.querySelector(".product-v2-tech-card__copy span"), component.label);
    setTextContent(item.querySelector(".product-v2-tech-card__copy strong"), name);
  });

  orderedKeys.forEach((key) => {
    const component = productComponent(product, key);
    const group = document.querySelector(`[data-config-summary="${key}"]`)?.closest("[data-config-group]");
    const firstChoice = group?.querySelector(`[data-config-choice][data-config-key="${key}"]`);
    if (group) group.hidden = !component;
    if (!component) return;
    setTextContent(group.querySelector(".config-group__copy strong"), component.label);
    setTextContent(group.querySelector("[data-config-summary]"), component.name);
    setTextContent(group.querySelector(".config-group__label"), component.label);
    group.querySelectorAll(`[data-config-choice][data-config-key="${key}"]`).forEach((choice, index) => {
      choice.hidden = index > 0;
      choice.classList.toggle("is-selected", index === 0);
      choice.querySelector("[data-config-select]")?.setAttribute("aria-checked", String(index === 0));
    });
    applyComponentToChoice(firstChoice, component);
  });

  document.querySelectorAll("[data-summary-row]").forEach((row) => {
    const component = productComponent(product, row.dataset.summaryRow);
    row.hidden = !component;
    if (component) setTextContent(row.querySelector("[data-summary-value]"), component.name);
  });

  updateProductPriceDisplay(productDetail);
}

function updateProductPriceDisplay(detail) {
  const basePrice = Number(detail.dataset.basePrice || parseEuroValue(detail.dataset.price));
  const config = selectedConfigFromDetail(detail);
  const visiblePrice = basePrice + config.total;
  const parts = priceParts(visiblePrice);
  const priceMarkup = `${parts.euros}<span>${parts.cents}€</span>`;

  const displayPriceMarkup = document.body.classList.contains("product-v2-body")
    ? `${visiblePrice.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€`
    : priceMarkup;

  const currentPrice = detail.querySelector(".product-price-current");
  const stickyPrice = document.querySelector(".sticky-buy-bar > .sticky-buy-bar__inner > strong");
  if (currentPrice) currentPrice.innerHTML = displayPriceMarkup;
  if (stickyPrice) stickyPrice.innerHTML = displayPriceMarkup;
}

function productFromDetail(detail) {
  const options = selectedOptionsFromDetail(detail);
  const config = selectedConfigFromDetail(detail);
  const basePriceText = detail.dataset.price || detail.querySelector(".product-price-current")?.textContent?.trim() || "";
  const baseDescription = detail.dataset.description || detail.querySelector(".product-heading p")?.textContent?.trim() || "";
  const configDescription = config.items.length
    ? ` | Configuração: ${config.items.map((item) => item.name).join(", ")}`
    : "";
  const optionDescription = options.items.length
    ? ` | Opcionais: ${options.items.map((item) => `${item.name} (${formatEuroDelta(item.price)})`).join(", ")}`
    : "";

  return {
    title: detail.dataset.title || detail.querySelector("h1")?.textContent?.trim() || "Produto",
    price: config.total || options.total ? formatEuroValue(parseEuroValue(basePriceText) + config.total + options.total) : basePriceText,
    description: `${baseDescription}${configDescription}${optionDescription}`,
    image: detail.querySelector(".product-gallery__stage img")?.getAttribute("src") || cartFallbackImage,
    cpu: detail.dataset.cpu || "-",
    gpu: detail.dataset.gpu || "-",
    ram: detail.dataset.ram || "-",
    storage: detail.dataset.storage || "-",
    status: detail.dataset.status || "-",
  };
}

function showScrim() {
  scrim?.classList.add("is-visible");
  document.body.classList.add("has-modal-open");
}

function hideScrimIfIdle() {
  const anyOpen = [sideMenu, cartDrawer, wishlistDrawer, compareDrawer, filtersPanel, loginPopup].some((panel) => panel?.classList.contains("is-open"));
  if (!anyOpen) {
    scrim?.classList.remove("is-visible");
    document.body.classList.remove("has-modal-open");
  }
}

function closeAllPanels() {
  sideMenu?.classList.remove("is-open");
  cartDrawer?.classList.remove("is-open");
  wishlistDrawer?.classList.remove("is-open");
  compareDrawer?.classList.remove("is-open");
  filtersPanel?.classList.remove("is-open");
  loginPopup?.classList.remove("is-open");
  sideMenuToggle?.setAttribute("aria-expanded", "false");
  filterToggle?.setAttribute("aria-expanded", "false");
  scrim?.classList.remove("is-visible");
  document.body.classList.remove("has-modal-open");
}

function openPanel(panel) {
  [sideMenu, cartDrawer, wishlistDrawer, compareDrawer, filtersPanel, loginPopup].forEach((item) => {
    if (item !== panel) item?.classList.remove("is-open");
  });
  if (panel !== sideMenu) sideMenuToggle?.setAttribute("aria-expanded", "false");
  if (panel !== filtersPanel) filterToggle?.setAttribute("aria-expanded", "false");
  panel?.classList.add("is-open");
  if (panel) showScrim();
}

function resetProtectionStep() {
  selectedProtectionOptions = [];
  protectionStepCompleted = false;
}

function completeProtectionStep(options = []) {
  selectedProtectionOptions = options;
  protectionStepCompleted = true;
}

function showCart() {
  renderCart();
  openPanel(cartDrawer);
}

function renderCartFooter(mode = "cart") {
  if (!cartFooter) return;

  if (mode === "protection") {
    cartFooter.innerHTML = `
      <button class="drawer-button--secondary" type="button" data-protection-skip>Omitir e continuar</button>
      <button type="button" data-protection-continue>Continuar compra</button>
    `;
    return;
  }

  const quantity = cartQuantityTotal();
  const subtotal = cartSubtotal();
  const remaining = Math.max(freeShippingThreshold - subtotal, 0);
  const progress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const shippingMessage = remaining
    ? `Falta ${formatEuroHtml(remaining)} para portes gr&aacute;tis`
    : "Portes gr&aacute;tis dispon&iacute;veis";

  cartFooter.innerHTML = `
    <section class="cart-summary" aria-label="Resumo do carrinho">
      <p class="cart-summary__shipping">${shippingMessage}</p>
      <div class="cart-summary__progress" aria-hidden="true"><span style="width: ${progress}%"></span></div>
      <p class="cart-summary__saving"><span>%</span> Poupas at&eacute; 15% vs. componentes separados</p>
      <div class="cart-summary__subtotal">
        <span>Subtotal</span>
        <strong>${formatEuroHtml(subtotal)}</strong>
      </div>
      <p class="cart-summary__note">Envio calculado no checkout. IVA inclu&iacute;do.</p>
      <div class="cart-payment-badges" aria-label="M&eacute;todos de pagamento">
        <span class="cart-payment-badges__mbway">MB WAY</span>
        <span class="cart-payment-badges__multibanco">MULTIBANCO</span>
        <span class="cart-payment-badges__visa">VISA</span>
        <span class="cart-payment-badges__mastercard"><i></i><i></i></span>
      </div>
      <button class="cart-summary__checkout" type="button" data-checkout-button ${quantity ? "" : "disabled"}>Finalizar Compra</button>
      <button class="cart-summary__continue" type="button" data-cart-continue>Continuar a comprar</button>
    </section>
  `;
}

function renderProtectionStep() {
  if (!cartBody) return;

  cartBody.innerHTML = `
    <section class="protection-step" aria-labelledby="protection-title">
      <p class="protection-step__kicker">Proteção opcional</p>
      <h2 id="protection-title">Escolhe se queres adicionar seguro antes de finalizar.</h2>
      <p class="protection-step__intro">Estas opções são independentes da configuração do produto. Podes selecionar uma ou mais, ou omitir este passo e continuar a compra sem seguro.</p>
      <div class="protection-options">
        ${protectionOptions
          .map(
            (option) => `
              <label class="protection-option">
                <input type="checkbox" value="${option.key}" data-protection-option ${selectedProtectionOptions.includes(option.key) ? "checked" : ""} />
                <span>
                  <strong>${option.title}</strong>
                  <small>${option.description}</small>
                </span>
              </label>
            `
          )
          .join("")}
      </div>
      <p class="protection-step__note">Valores, elegibilidade e documentação são confirmados antes da contratação. Este passo não altera o preço apresentado nesta maquete.</p>
    </section>
  `;
  renderCartFooter("protection");
  openPanel(cartDrawer);
}

function selectedProtectionsFromDrawer() {
  if (!cartBody) return [];
  return [...cartBody.querySelectorAll("[data-protection-option]:checked")].map((input) => input.value);
}

function renderCart() {
  const totalQuantity = cartQuantityTotal();
  cartCount.textContent = totalQuantity > 99 ? "99+" : String(totalQuantity);
  if (cartTitleCount) cartTitleCount.textContent = `(${totalQuantity})`;
  renderCartFooter();

  if (!cartItems.length) {
    resetProtectionStep();
    cartBody.innerHTML = "<p>O seu carrinho está vazio.</p>";
    return;
  }

  const protectionSummary = protectionStepCompleted
    ? `
      <section class="drawer-protection-summary">
        <strong>${selectedProtectionOptions.length ? "Proteções opcionais selecionadas" : "Compra sem seguro adicional"}</strong>
        ${
          selectedProtectionOptions.length
            ? `<ul>${selectedProtectionOptions
                .map((key) => protectionOptions.find((option) => option.key === key)?.title)
                .filter(Boolean)
                .map((title) => `<li>${title}</li>`)
                .join("")}</ul>`
            : "<p>Este passo foi omitido. Podes alterar antes de finalizar.</p>"
        }
        <button type="button" data-edit-protection>Alterar proteção</button>
      </section>
    `
    : "";

  cartBody.innerHTML = cartItems
    .map((item, index) => {
      const quantity = Number(item.quantity || 1);
      const specs = cartSpecsFromProduct(item)
        .map(([label, value]) => `<li><span>${label}:</span> ${escapeHtml(value)}</li>`)
        .join("");
      return `
        <article class="cart-line">
          <img class="cart-line__image" src="${escapeHtml(item.image || cartFallbackImage)}" alt="${escapeHtml(displayProductTitle(item.title))}" />
          <div class="cart-line__content">
            <h3>${escapeHtml(displayProductTitle(item.title))}</h3>
            <strong class="cart-line__price">${formatEuroHtml(parseEuroValue(item.price))}</strong>
            ${specs ? `<ul>${specs}</ul>` : `<p>${escapeHtml(item.description || "")}</p>`}
          </div>
          <button class="cart-line__remove" type="button" data-remove-cart="${index}" aria-label="Remover ${escapeHtml(displayProductTitle(item.title))}">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 4h6m-8 4h10m-8 3v7m6-7v7M8 8l1 12h6l1-12" />
            </svg>
          </button>
          <div class="cart-line__quantity" aria-label="Quantidade">
            <button type="button" data-cart-decrease="${index}" aria-label="Diminuir quantidade">-</button>
            <span>${quantity}</span>
            <button type="button" data-cart-increase="${index}" aria-label="Aumentar quantidade">+</button>
          </div>
        </article>
      `;
    })
    .join("") + protectionSummary;
}

function renderWishlist() {
  wishlistCount.textContent = String(wishlistItems.length);

  if (!wishlistItems.length) {
    wishlistBody.innerHTML = "<p>A sua lista de desejos está vazia.</p>";
    return;
  }

  wishlistBody.innerHTML = wishlistItems
    .map(
      (item, index) => `
        <article class="drawer-item">
          <strong>${item.title}</strong>
          <span>${item.description}</span>
          <span>${item.price}</span>
          <button type="button" data-remove-wishlist="${index}">Remover da lista de desejos</button>
        </article>
      `
    )
    .join("");
}

function renderCompare() {
  compareCount.textContent = String(compareItems.length);

  if (!compareItems.length) {
    compareBody.innerHTML = "<p>Selecione até duas máquinas para comparar componentes e configuração.</p>";
    return;
  }

  const headings = compareItems.map((item, index) => `<th>Máquina ${index + 1}<br />${item.title}</th>`).join("");
  const row = (label, key) => `<tr><th>${label}</th>${compareItems.map((item) => `<td>${item[key]}</td>`).join("")}</tr>`;

  compareBody.innerHTML = `
    <table class="compare-table">
      <thead><tr><th>Componente</th>${headings}</tr></thead>
      <tbody>
        ${row("Preço", "price")}
        ${row("CPU", "cpu")}
        ${row("GPU", "gpu")}
        ${row("RAM", "ram")}
        ${row("Armazenamento", "storage")}
        ${row("Disponibilidade", "status")}
      </tbody>
    </table>
    <p class="drawer-item"><button type="button" data-clear-compare>Limpar comparador</button></p>
  `;
}

function initTheme() {
  const savedTheme = localStorage.getItem("eurosys-theme");
  document.body.classList.toggle("theme-dark", savedTheme === "dark");
  syncThemeControls();
}

function syncThemeControls() {
  const isDark = document.body.classList.contains("theme-dark");
  themeToggles.forEach((toggle) => {
    toggle.setAttribute("aria-pressed", String(isDark));
    const label = toggle.querySelector("[data-theme-label]");
    if (label) label.textContent = isDark ? "Modo escuro" : "Modo claro";
  });
}

function setTheme(isDark) {
  document.body.classList.toggle("theme-dark", isDark);
  localStorage.setItem("eurosys-theme", isDark ? "dark" : "light");
  syncThemeControls();
}

function initProductQuickActions() {
  const icons = {
    wishlist: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" /></svg>',
    compare: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3h4v4" /><path d="M21 3 14 10" /><path d="M7 21H3v-4" /><path d="M3 21l7-7" /><path d="M14 3h3" /><path d="M7 21h3" /></svg>',
  };

  document.querySelectorAll(".product-card").forEach((card) => {
    if (card.querySelector(".product-card__quick-actions")) return;

    const image = card.querySelector(":scope > img");
    const familyTag = card.querySelector(":scope > span");
    const actions = card.querySelector(".product-card__actions");
    const wishlistButton = actions?.querySelector("[data-add-wishlist]");
    const compareButton = actions?.querySelector("[data-add-compare]");

    if (!image || !familyTag || !actions || !wishlistButton || !compareButton) return;

    wishlistButton.innerHTML = `${icons.wishlist}<span>Guardar</span>`;
    compareButton.innerHTML = `${icons.compare}<span>Comparar</span>`;

    const quickActions = document.createElement("div");
    quickActions.className = "product-card__quick-actions";
    quickActions.append(familyTag, wishlistButton, compareButton);
    image.insertAdjacentElement("afterend", quickActions);
  });
}

function normalizeText(value) {
  return (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function initCatalogFilters() {
  if (!filtersPanel || !productGrid) return;

  const lockedCategory = normalizeText(document.body.dataset.catalogCategory || productGrid.dataset.catalogCategory || "");
  const searchInput = filtersPanel.querySelector('input[type="search"]');
  const clearButton = filtersPanel.querySelector("[data-filter-clear]") || filtersPanel.querySelector(".filters__header button");
  const checkboxes = [...filtersPanel.querySelectorAll('input[type="checkbox"]')];
  const tabButtons = [...filtersPanel.querySelectorAll("[data-filter-tab]")];
  const chipButtons = [...filtersPanel.querySelectorAll("[data-filter-chip]")];
  const priceButtons = [...document.querySelectorAll("[data-price-filter]")];
  const visibleCount = document.querySelector("[data-visible-count]");
  const sortButtons = [...document.querySelectorAll("[data-sort-products]")];
  const sortSelect = document.querySelector("[data-sort-select]");

  function selectedInFieldset(title) {
    const fieldset = [...filtersPanel.querySelectorAll("fieldset")].find(
      (item) => item.dataset.filterGroup === title || normalizeText(item.querySelector("legend")?.textContent) === normalizeText(title)
    );
    if (!fieldset) return [];
    return [...fieldset.querySelectorAll('input[type="checkbox"]:checked')].map((input) => normalizeText(input.value || input.closest("label")?.textContent));
  }

  function cardPrice(card) {
    const priceText = card.querySelector(".product-card__meta strong")?.textContent || "0";
    const normalized = priceText.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
    return Number.parseFloat(normalized) || 0;
  }

  function compactValue(value) {
    return normalizeText(value).replace(/\s+/g, "");
  }

  function capacityMatches(option, target) {
    const compactTarget = compactValue(target);
    const compactOption = compactValue(option);
    if (!compactOption) return true;
    if (compactTarget.includes(compactOption)) return true;

    if (compactOption.includes("/")) {
      const unit = compactOption.includes("tb") ? "tb" : compactOption.includes("gb") ? "gb" : "";
      return compactOption
        .replace(/tb|gb/g, "")
        .split("/")
        .some((part) => compactTarget.includes(`${part}${unit}`));
    }

    return false;
  }

  function syncFilterSections(fieldset, { resetHidden = false } = {}) {
    if (!fieldset) return;
    const activeTab = fieldset.querySelector("[data-filter-tab].is-active:not([data-filter-tab='all'])")?.dataset.filterTab;
    fieldset.querySelectorAll("[data-filter-section]").forEach((section) => {
      const isHidden = Boolean(activeTab && section.dataset.filterSection !== activeTab);
      section.classList.toggle("is-hidden", isHidden);
      if (isHidden && resetHidden) {
        section.querySelectorAll('input[type="checkbox"]').forEach((input) => {
          input.checked = false;
        });
      }
    });
  }

  function syncCapacityOptions(fieldset, { resetHidden = false } = {}) {
    if (!fieldset) return;
    const activeChips = [...fieldset.querySelectorAll("[data-filter-chip].is-active")].map((button) => normalizeText(button.dataset.filterChip));

    fieldset.querySelectorAll(".filter-subsection").forEach((section) => {
      let visibleOptions = 0;

      section.querySelectorAll("label").forEach((label) => {
        const input = label.querySelector('input[type="checkbox"]');
        const value = input?.value || label.textContent || "";
        const isHidden = Boolean(activeChips.length && !activeChips.some((chip) => capacityMatches(chip, value)));

        label.classList.toggle("is-option-hidden", isHidden);
        if (isHidden && resetHidden && input) input.checked = false;
        if (!isHidden) visibleOptions += 1;
      });

      section.classList.toggle("is-empty-by-chip", Boolean(activeChips.length && visibleOptions === 0));
    });
  }

  function optionMatches(group, option, cardData) {
    const { title, description, family, status, cpu, gpu, ram, storage, price } = cardData;
    const text = `${title} ${description} ${family} ${status} ${cpu} ${gpu} ${ram} ${storage}`;

    if (group === "familias") return family.includes(option) || title.includes(option);
    if (group === "disponibilidade") {
      if (option.includes("em stock")) return status.includes("em stock");
      if (option.includes("sob")) return status.includes("sob");
      return status.includes(option);
    }
    if (group === "orcamento") {
      if (option === "ate-350") return price <= 350;
      if (option === "350-450") return price > 350 && price <= 450;
      if (option === "450-500") return price > 450 && price <= 500;
      return true;
    }
    if (group === "desempenho") {
      if (option === "entrada") return price <= 420 || title.includes("office");
      if (option === "intermedio") return price > 420 && price <= 500;
      if (option === "gaming") return family.includes("gaming") || title.includes("raptor");
      if (option === "mini") return family.includes("mini") || title.includes("nuc");
      return true;
    }
    if (group === "processador") {
      if (option === "intel") return cpu.includes("intel") || cpu.includes("i3") || cpu.includes("i5") || title.includes("nuc");
      if (option === "amd") return cpu.includes("ryzen") || cpu.includes("r5") || cpu.includes("r7");
      return cpu.includes(option) || description.includes(option);
    }
    if (group === "memoria") return ram.includes(option) || description.includes(option) || capacityMatches(option, ram);
    if (group === "armazenamento") return storage.includes(option) || description.includes(option) || capacityMatches(option, storage);
    if (group === "grafica") {
      if (option === "integrada") return gpu.includes("integrada") || description.includes("gpu integrada");
      if (option === "amd") return gpu.includes("amd") || gpu.includes("rx ");
      if (option === "nvidia") return gpu.includes("nvidia") || gpu.includes("rtx") || gpu.includes("gt ");
      return gpu.includes(option) || description.includes(option) || capacityMatches(option, gpu);
    }
    if (group === "marca") return title.includes(option);

    return text.includes(option);
  }

  function priceInRange(price, range) {
    if (!range) return true;
    if (range === "0-500") return price <= 500;
    if (range === "500-1000") return price >= 500 && price <= 1000;
    if (range === "1000-2000") return price >= 1000 && price <= 2000;
    if (range === "2000-3000") return price >= 2000 && price <= 3000;
    if (range === "3000-plus") return price > 3000;
    return true;
  }

  function applyFilters() {
    const query = normalizeText(searchInput?.value);
    const activePriceRange = document.querySelector("[data-price-filter].is-active")?.dataset.priceFilter || "";
    const activeGroups = [];
    filtersPanel.querySelectorAll("fieldset[data-filter-group]").forEach((fieldset) => {
      const name = fieldset.dataset.filterGroup;
      const checkboxOptions = [...fieldset.querySelectorAll('input[type="checkbox"]:checked')].map((input) =>
        normalizeText(input.value || input.closest("label")?.textContent)
      );
      const tabOptions = [...fieldset.querySelectorAll("[data-filter-tab].is-active:not([data-filter-tab='all'])")].map((button) =>
        normalizeText(button.dataset.filterTab)
      );
      const chipOptions = [...fieldset.querySelectorAll("[data-filter-chip].is-active")].map((button) => normalizeText(button.dataset.filterChip));

      [checkboxOptions, tabOptions, chipOptions].forEach((options) => {
        if (options.length) activeGroups.push({ name, options });
      });
    });

    let visibleProducts = 0;

    [...productGrid.querySelectorAll(".product-card")].forEach((card) => {
      const title = normalizeText(card.querySelector("h3")?.textContent);
      const description = normalizeText(card.querySelector("p")?.textContent);
      const family = normalizeText(card.querySelector(".product-card__quick-actions > span, .product-card > span")?.textContent);
      const status = normalizeText(card.dataset.status);
      const cardData = {
        title,
        description,
        family,
        status,
        cpu: normalizeText(card.dataset.cpu),
        gpu: normalizeText(card.dataset.gpu),
        ram: normalizeText(card.dataset.ram),
        storage: normalizeText(card.dataset.storage),
        price: cardPrice(card),
      };

      const matchesQuery = !query || `${title} ${description} ${family}`.includes(query);
      const matchesLockedCategory = !lockedCategory || family.includes(lockedCategory) || title.includes(lockedCategory);
      const matchesGroups = activeGroups.every((group) => group.options.some((option) => optionMatches(group.name, option, cardData)));
      const matchesPrice = priceInRange(cardData.price, activePriceRange);

      const isVisible = matchesLockedCategory && matchesQuery && matchesGroups && matchesPrice;
      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) visibleProducts += 1;
    });

    if (visibleCount) visibleCount.textContent = String(visibleProducts);
  }

  function sortProducts(mode) {
    const cards = [...productGrid.querySelectorAll(".product-card")];
    cards
      .sort((a, b) => {
        if (mode === "price-asc") return cardPrice(a) - cardPrice(b);
        if (mode === "price-desc") return cardPrice(b) - cardPrice(a);
        return (a.querySelector("h3")?.textContent || "").localeCompare(b.querySelector("h3")?.textContent || "", "pt-PT");
      })
      .forEach((card) => productGrid.append(card));
  }

  searchInput?.addEventListener("input", applyFilters);
  checkboxes.forEach((checkbox) => checkbox.addEventListener("change", applyFilters));
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabs = button.closest(".filter-tabs");
      const fieldset = button.closest("fieldset");
      tabs?.querySelectorAll("[data-filter-tab]").forEach((item) => item.classList.toggle("is-active", item === button));
      syncFilterSections(fieldset, { resetHidden: true });
      syncCapacityOptions(fieldset, { resetHidden: true });
      applyFilters();
    });
  });
  chipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const fieldset = button.closest("fieldset");
      button.classList.toggle("is-active");
      syncCapacityOptions(fieldset, { resetHidden: true });
      applyFilters();
    });
  });
  priceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const wasActive = button.classList.contains("is-active");
      priceButtons.forEach((item) => item.classList.remove("is-active"));
      if (!wasActive) button.classList.add("is-active");
      applyFilters();
    });
  });
  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      sortProducts(button.dataset.sortProducts);
    });
  });
  sortSelect?.addEventListener("change", () => {
    sortProducts(sortSelect.value);
  });
  clearButton?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    tabButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filterTab === "all");
    });
    chipButtons.forEach((button) => {
      button.classList.remove("is-active");
    });
    priceButtons.forEach((button) => {
      button.classList.remove("is-active");
    });
    filtersPanel.querySelectorAll("fieldset[data-filter-group]").forEach((fieldset) => {
      syncFilterSections(fieldset);
      syncCapacityOptions(fieldset);
    });
    applyFilters();
  });

  filtersPanel.querySelectorAll("fieldset[data-filter-group]").forEach((fieldset) => {
    syncFilterSections(fieldset);
    syncCapacityOptions(fieldset);
  });
  applyFilters();
}

function syncFooterPanels() {
  if (!footerPanels.length) return;
  const shouldOpen = window.matchMedia("(min-width: 901px)").matches;
  footerPanels.forEach((panel) => {
    panel.open = shouldOpen;
  });
}

function initProductOptions() {
  document.querySelectorAll("[data-product-options]").forEach((root) => {
    const closeSelects = () => {
      root.querySelectorAll("[data-optional-select]").forEach((select) => {
        select.classList.remove("is-open");
        select.querySelector("[data-optional-select-toggle]")?.setAttribute("aria-expanded", "false");
      });
    };

    const updateRow = (row) => {
      const checkbox = row?.querySelector("[data-optional-checkbox]");
      if (!row || !checkbox) return;
      row.classList.toggle("is-selected", checkbox.checked);
    };

    const updateSummary = () => {
      const options = selectedOptionsFromDetail(productDetail || document);
      const summary = root.querySelector("[data-optional-summary]");
      const total = root.querySelector("[data-optional-total]");
      if (summary) {
        summary.textContent =
          options.items.length === 1
            ? "1 opcional selecionado"
            : options.items.length > 1
              ? `${options.items.length} opcionais selecionados`
              : "Sem opcionais selecionados";
      }
      if (total) total.textContent = formatEuroDelta(options.total);
    };

    root.querySelectorAll("[data-optional-item]").forEach((row) => updateRow(row));
    updateSummary();

    root.addEventListener("change", (event) => {
      const checkbox = event.target.closest("[data-optional-checkbox]");
      if (!checkbox) return;

      const row = checkbox.closest("[data-optional-item]");
      if (row?.classList.contains("optional-item--select") && !checkbox.checked) {
        const emptyOption = row.querySelector('[data-monitor-option][data-price="0"]');
        emptyOption?.click();
        return;
      }

      if (row) {
        row.dataset.optionalPrice = checkbox.checked ? checkbox.dataset.optionalPrice || row.dataset.optionalPrice || "0" : "0";
        row.dataset.optionalSelectedName = checkbox.checked ? checkbox.dataset.optionalName || "" : "";
      }
      updateRow(row);
      updateSummary();
    });

    root.addEventListener("click", (event) => {
      const toggle = event.target.closest("[data-optional-select-toggle]");
      if (toggle) {
        const select = toggle.closest("[data-optional-select]");
        const willOpen = !select.classList.contains("is-open");
        closeSelects();
        select.classList.toggle("is-open", willOpen);
        toggle.setAttribute("aria-expanded", String(willOpen));
        return;
      }

      const option = event.target.closest("[data-monitor-option]");
      if (option) {
        const row = option.closest("[data-optional-item]");
        const checkbox = row?.querySelector("[data-optional-checkbox]");
        const selectedLabel = row?.querySelector("[data-optional-selected-label]");
        const selectToggle = row?.querySelector("[data-optional-select-toggle]");
        const priceLabel = row?.querySelector("[data-optional-price-label]");
        const price = Number(option.dataset.price || 0);
        const label = option.dataset.label || "Nenhuma opção selecionada";

        row.querySelectorAll("[data-monitor-option]").forEach((item) => {
          const isSelected = item === option;
          item.classList.toggle("is-selected", isSelected);
          item.setAttribute("aria-selected", String(isSelected));
        });

        if (checkbox) checkbox.checked = price > 0;
        if (row) {
          row.dataset.optionalPrice = String(price);
          row.dataset.optionalSelectedName = price > 0 ? label : "";
        }
        if (selectedLabel) selectedLabel.textContent = label;
        if (selectToggle) selectToggle.setAttribute("aria-label", `Monitor: ${label}`);
        if (priceLabel) priceLabel.textContent = formatEuroDelta(price);

        updateRow(row);
        updateSummary();
        closeSelects();
      }
    });

    document.addEventListener("click", (event) => {
      if (!root.contains(event.target)) closeSelects();
    });
  });
}

const configCategoryLabels = {
  gpu: "PLACA GR\u00c1FICA",
  cpu: "PROCESSADOR",
  motherboard: "MOTHERBOARD",
  memory: "MEM\u00d3RIA",
  storage: "STORAGE",
  cooler: "COOLER",
  fan: "FAN",
  case: "CAIXA",
  psu: "FONTE DE ALIMENTA\u00c7\u00c3O",
};

const configBrandHints = ["ASUS", "MANLI", "ZOTAC", "INTEL", "AMD", "KLEVV", "ADATA XPG", "ADATA", "NTECH", "SLAYER", "BLUERAY", "PNY", "KINGSTON", "CORSAIR", "MSI", "GIGABYTE"];

function cleanDetailText(value) {
  return String(value || "")
    .replace(/Â·/g, "\u00b7")
    .replace(/\?\?/g, "\u00b7")
    .replace(/\s+/g, " ")
    .trim();
}

function splitDetailText(value) {
  return cleanDetailText(value)
    .split(/\s*(?:\u00b7|\||•)\s*/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function usefulDetailText(value) {
  const cleaned = cleanDetailText(value);
  if (!cleaned || cleaned === "-") return "";
  if (/^TBD/i.test(cleaned)) return "";
  return cleaned;
}

function inferConfigBrand(choice) {
  const name = cleanDetailText(choice?.dataset.configName).toUpperCase();
  if (/^(I[3579]|INTEL)/.test(name)) return "INTEL";
  if (/RYZEN|AMD/.test(name)) return "AMD";
  return configBrandHints.find((brand) => name.includes(brand)) || "";
}

function renderConfigDetailBody(choice) {
  const title = cleanDetailText(choice.dataset.configName || "Componente");
  const configKey = choice.dataset.configKey;
  const matchingChoice = Array.from(document.querySelectorAll("[data-config-choice]")).find((item) => cleanDetailText(item.dataset.configName) === title);
  const selectedChoice = Array.from(document.querySelectorAll("[data-config-choice].is-selected")).find((item) => item.dataset.configKey === configKey);
  const fallbackChoice = matchingChoice || selectedChoice;
  const image = usefulDetailText(choice.dataset.configImage || fallbackChoice?.dataset.configImage);
  const ref = usefulDetailText(choice.dataset.configRef);
  const specs = usefulDetailText(choice.dataset.configSpecs);
  const performance = usefulDetailText(choice.dataset.configPerformance);
  const fps = usefulDetailText(choice.dataset.configFps);
  const brand = inferConfigBrand(choice);
  const description = specs ? splitDetailText(specs).join(" ") : title;
  const descriptionText = performance && !/componente inclu/i.test(performance) ? performance : description;
  const highlights = splitDetailText(specs)
    .map(usefulDetailText)
    .filter((item) => item && !/componente inclu/i.test(item));
  const rows = [
    ["Refer\u00eancia", ref],
    ["Marca", brand],
    ["Modelo", title],
    ["Especifica\u00e7\u00f5es", specs],
    ["Perfil", performance && !/componente inclu/i.test(performance) ? performance : ""],
    ["Estimativa", fps],
  ].filter(([, value]) => usefulDetailText(value));

  return `
    ${image ? `<div class="config-detail-image"><img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" loading="lazy" /></div>` : ""}

    <section class="config-detail-section">
      <h3>Descri\u00e7\u00e3o</h3>
      <p>${escapeHtml(descriptionText || title)}</p>
    </section>

    <section class="config-detail-section">
      <h3>Destaques</h3>
      <div class="config-detail-chips">
        ${(highlights.length ? highlights : [description]).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
    </section>

    <section class="config-detail-section">
      <h3>Especifica\u00e7\u00f5es</h3>
      <dl class="config-detail-specs">
        ${rows.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
      </dl>
    </section>
  `;
}

function initProductV2Columns() {
  if (!document.body.classList.contains("product-v2-body")) return;
  if (document.querySelector(".product-v2-two-column-shell")) return;

  const hero = document.querySelector(".product-hero");
  const overview = document.querySelector(".product-v2-overview");
  const configSection = document.querySelector(".product-config-section");
  if (!hero || !overview || !configSection) return;

  const gallery = hero.querySelector(".product-gallery");
  const purchase = hero.querySelector(".product-purchase-card--v2");
  const mobileSummary = purchase?.querySelector(".configuration-summary");
  const story = overview.querySelector(".product-v2-story");
  const techCard = overview.querySelector(".product-v2-tech-card");
  const configCopy = configSection.querySelector(".product-config-copy");
  const optionsCard = configSection.querySelector(".product-options-card");
  const insurance = configCopy?.querySelector(".product-v2-insurance");
  const configBuilder = configCopy?.querySelector(".config-builder");
  const requiredBlocks = [gallery, purchase, story, techCard, configCopy, optionsCard, insurance];
  if (requiredBlocks.some((block) => !block)) return;

  const shell = document.createElement("section");
  shell.className = "container product-v2-two-column-shell";
  shell.setAttribute("aria-labelledby", "product-title-v2");

  const leftColumn = document.createElement("div");
  leftColumn.className = "product-v2-column product-v2-column--left";
  const rightColumn = document.createElement("div");
  rightColumn.className = "product-v2-column product-v2-column--right";

  hero.before(shell);

  hero.remove();
  overview.remove();
  configSection.remove();

  const media = window.matchMedia("(min-width: 1101px)");
  const mobileMedia = window.matchMedia("(max-width: 760px)");
  let resizeObserver = null;
  const syncDesktopColumnHeight = () => {
    if (!media.matches || !shell.classList.contains("is-desktop-columns")) {
      rightColumn.style.removeProperty("--v2-left-column-height");
      return;
    }

    rightColumn.style.setProperty("--v2-left-column-height", `${Math.ceil(leftColumn.getBoundingClientRect().height)}px`);
  };

  const arrangeColumns = () => {
    const restoreSummary = () => {
      if (mobileSummary && mobileSummary.parentElement !== purchase) {
        purchase.append(mobileSummary);
      }
    };

    const swapOptionsAndInsurance = (insuranceParent) => {
      if (configBuilder && optionsCard.parentElement !== configCopy) {
        configCopy.insertBefore(optionsCard, configBuilder);
      } else if (optionsCard.parentElement !== configCopy) {
        configCopy.append(optionsCard);
      }
      insuranceParent.append(insurance);
    };

    const placeMobileOptionsAndInsurance = () => {
      if (configBuilder && configBuilder.parentElement === configCopy) {
        configBuilder.after(optionsCard);
      } else if (optionsCard.parentElement !== configCopy) {
        configCopy.append(optionsCard);
      }
      shell.append(insurance);
    };

    if (media.matches) {
      restoreSummary();
      shell.classList.add("is-desktop-columns");
      shell.append(leftColumn, rightColumn);
      leftColumn.append(gallery, story);
      rightColumn.append(purchase, techCard, configCopy);
      swapOptionsAndInsurance(rightColumn);
      requestAnimationFrame(syncDesktopColumnHeight);
      return;
    }

    shell.classList.remove("is-desktop-columns");
    rightColumn.style.removeProperty("--v2-left-column-height");

    if (mobileMedia.matches) {
      shell.append(gallery, purchase);
      if (mobileSummary) shell.append(mobileSummary);
      shell.append(configCopy);
      placeMobileOptionsAndInsurance();
      shell.append(story, techCard);
      leftColumn.remove();
      rightColumn.remove();
      return;
    }

    restoreSummary();
    shell.append(gallery, purchase, story, techCard, configCopy);
    swapOptionsAndInsurance(shell);
    leftColumn.remove();
    rightColumn.remove();
  };

  arrangeColumns();
  window.addEventListener("resize", syncDesktopColumnHeight);
  leftColumn.querySelectorAll("img").forEach((image) => {
    image.addEventListener("load", syncDesktopColumnHeight, { once: true });
  });
  if ("ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(syncDesktopColumnHeight);
    resizeObserver.observe(leftColumn);
  }
  if (media.addEventListener) {
    media.addEventListener("change", arrangeColumns);
  } else if (media.addListener) {
    media.addListener(arrangeColumns);
  }
  if (mobileMedia.addEventListener) {
    mobileMedia.addEventListener("change", arrangeColumns);
  } else if (mobileMedia.addListener) {
    mobileMedia.addListener(arrangeColumns);
  }
}

function initStickyBuyBarReveal() {
  const stickyBar = document.querySelector(".sticky-buy-bar");
  if (!stickyBar) return;

  if (!document.body.classList.contains("product-v2-body")) {
    stickyBar.classList.add("is-visible");
    return;
  }

  const mobileStickyMedia = window.matchMedia("(max-width: 760px)");
  const getThreshold = () => (mobileStickyMedia.matches ? 0.2 : 0.4);
  const scrollProgress = (element) => {
    const maxScroll = Math.max(0, element.scrollHeight - element.clientHeight);
    return maxScroll ? element.scrollTop / maxScroll : 0;
  };

  const pageProgress = () => {
    const root = document.documentElement;
    const maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
    return maxScroll ? window.scrollY / maxScroll : 0;
  };

  const updateStickyBar = () => {
    const columnProgress = Array.from(document.querySelectorAll(".product-v2-column--right")).reduce(
      (max, column) => Math.max(max, scrollProgress(column)),
      0
    );
    stickyBar.classList.toggle("is-visible", Math.max(pageProgress(), columnProgress) >= getThreshold());
  };

  window.addEventListener("scroll", updateStickyBar, { passive: true });
  window.addEventListener("resize", updateStickyBar);
  if (mobileStickyMedia.addEventListener) {
    mobileStickyMedia.addEventListener("change", updateStickyBar);
  } else if (mobileStickyMedia.addListener) {
    mobileStickyMedia.addListener(updateStickyBar);
  }
  document.addEventListener("scroll", updateStickyBar, { passive: true, capture: true });
  document.querySelectorAll(".product-v2-column--right").forEach((column) => {
    column.addEventListener("scroll", updateStickyBar, { passive: true });
  });
  updateStickyBar();
}

function initFinanceDropdown() {
  const financeCard = document.querySelector("[data-finance-card]");
  if (!financeCard) return;

  const toggle = financeCard.querySelector("[data-finance-toggle]");
  const selected = financeCard.querySelector("[data-finance-selected]");
  const options = financeCard.querySelectorAll("[data-finance-option]");

  const close = () => {
    financeCard.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  };

  toggle?.addEventListener("click", () => {
    const willOpen = !financeCard.classList.contains("is-open");
    financeCard.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.financeOption || "";
      if (selected && value) selected.innerHTML = value;
      options.forEach((item) => item.setAttribute("aria-selected", String(item === option)));
      close();
    });
  });

  document.addEventListener("click", (event) => {
    if (financeCard.contains(event.target)) return;
    close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function initProductV2LinkedRightScroll() {
  if (!document.body.classList.contains("product-v2-body")) return;

  const media = window.matchMedia("(min-width: 1101px)");
  const startRatio = 0.6;
  const pageFollowRatio = 0.32;
  const previousTops = new WeakMap();
  let isSyncingPage = false;

  const linkColumnScroll = (column) => {
    const maxScroll = Math.max(0, column.scrollHeight - column.clientHeight);
    const previousTop = previousTops.get(column) ?? column.scrollTop;
    const delta = column.scrollTop - previousTop;
    previousTops.set(column, column.scrollTop);

    if (!media.matches || !maxScroll || isSyncingPage || Math.abs(delta) < 1) return;

    const progress = column.scrollTop / maxScroll;
    if (progress < startRatio) return;

    isSyncingPage = true;
    window.scrollBy({ top: delta * pageFollowRatio, left: 0 });
    requestAnimationFrame(() => {
      isSyncingPage = false;
    });
  };

  document.addEventListener(
    "scroll",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.classList.contains("product-v2-column--right")) return;
      linkColumnScroll(target);
    },
    { passive: true, capture: true }
  );

  window.addEventListener("resize", () => {
    document.querySelectorAll(".product-v2-column--right").forEach((column) => {
      previousTops.set(column, column.scrollTop);
    });
  });
}

function initProductConfigurator() {
  const builder = document.querySelector("[data-config-builder]");
  const detail = productDetail;
  const panel = document.querySelector("[data-config-detail-panel]");
  const configForm = document.querySelector("[data-config-form]");
  const summary = document.querySelector(".configuration-summary");
  if (!builder || !detail) return;

  const fieldMap = {
    gpu: "gpu",
    cpu: "cpu",
    memory: "ram",
    storage: "storage",
    psu: "psu",
  };

  const closeDetailPanel = () => {
    panel?.classList.remove("is-open");
    panel?.setAttribute("aria-hidden", "true");
  };

  const openDetailPanel = (choice) => {
    if (!panel || !choice) return;
    const title = cleanDetailText(choice.dataset.configName || "Componente");
    const category = configCategoryLabels[choice.dataset.configKey] || "COMPONENTE";
    const brand = inferConfigBrand(choice);
    const body = panel.querySelector(".config-detail-panel__body");

    panel.querySelector("[data-config-detail-category]").textContent = category;
    panel.querySelector("[data-config-detail-title]").textContent = title;
    panel.querySelector("[data-config-detail-brand]").textContent = brand || cleanDetailText(choice.dataset.configRef) || "";
    if (body) body.innerHTML = renderConfigDetailBody(choice);
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    panel.querySelector(".config-detail-panel__card")?.focus();
  };

  const getChoicesForKey = (key) => [...builder.querySelectorAll(`[data-config-choice][data-config-key="${key}"]:not([hidden])`)];

  const getFieldForKey = (key) => {
    if (!configForm) return null;
    return [...configForm.querySelectorAll("[data-config-field]")].find((field) => field.dataset.configField === key) || null;
  };

  const getSelectedChoiceForKey = (key) =>
    getChoicesForKey(key).find((choice) => choice.classList.contains("is-selected")) || getChoicesForKey(key)[0] || null;

  const openSummaryDetail = (row) => {
    const key = row?.dataset.summaryRow;
    if (!key) return;
    openDetailPanel(getSelectedChoiceForKey(key));
  };

  const configChoicePriceLabel = (choice) => {
    const price = Number(choice?.dataset.configPrice || 0);
    return price === 0 ? "Incluído" : `+${price.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const choiceFromConfigOption = (option) => {
    const key = option?.dataset.configKey;
    const index = Number(option?.dataset.configIndex || 0);
    if (!key) return null;
    return getChoicesForKey(key)[index] || null;
  };

  const closeConfigDropdowns = (exceptField = null) => {
    if (!configForm) return;
    configForm.querySelectorAll("[data-config-field]").forEach((field) => {
      const isOpen = field === exceptField;
      field.classList.toggle("is-open", isOpen);
      field.querySelector("[data-config-field-toggle]")?.setAttribute("aria-expanded", String(isOpen));
    });
  };

  const syncConfigFormField = (key) => {
    const field = getFieldForKey(key);
    if (!field) return;
    const selectedChoice = getSelectedChoiceForKey(key);
    const value = field.querySelector("[data-config-field-value]");
    const toggle = field.querySelector("[data-config-field-toggle]");
    if (value) {
      value.textContent = selectedChoice?.dataset.configShort || selectedChoice?.dataset.configName || "Seleccione uma opção";
    }
    toggle?.classList.toggle("is-filled", Boolean(selectedChoice));
    field.querySelectorAll("[data-config-field-option]").forEach((option) => {
      const isSelected = choiceFromConfigOption(option) === selectedChoice;
      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-selected", String(isSelected));
    });
  };

  const renderConfigForm = () => {
    if (!configForm) return;
    configForm.querySelectorAll("[data-config-field]").forEach((field, fieldIndex) => {
      const key = field.dataset.configField;
      const toggle = field.querySelector("[data-config-field-toggle]");
      const choices = getChoicesForKey(key);
      const menuId = `product-v2-config-menu-${fieldIndex}`;
      toggle?.setAttribute("aria-haspopup", "listbox");
      toggle?.setAttribute("aria-controls", menuId);
      toggle?.toggleAttribute("disabled", choices.length === 0);

      const existingMenu = field.querySelector("[data-config-field-menu]");
      if (existingMenu) existingMenu.remove();

      const menu = document.createElement("div");
      menu.className = "product-v2-config-menu";
      menu.id = menuId;
      menu.dataset.configFieldMenu = "";
      menu.setAttribute("role", "listbox");
      menu.innerHTML = choices
        .map((choice, index) => {
          const name = choice.dataset.configName || "Componente";
          const ref = choice.dataset.configRef ? `Ref. ${choice.dataset.configRef}` : "";
          const performance = choice.dataset.configPerformance || choice.dataset.configSpecs || "";
          const fps = choice.dataset.configFps || "";
          const badge = choice.querySelector(".config-choice__badge")?.outerHTML || "";

          return `
            <article class="product-v2-config-option" role="option" data-config-field-option data-config-key="${escapeHtml(key)}" data-config-index="${index}" aria-selected="false">
              <button class="product-v2-config-option__main" type="button">
                <span class="product-v2-config-option__box" aria-hidden="true"></span>
                <span class="product-v2-config-option__copy">
                  <strong>${escapeHtml(name)}</strong>
                  ${ref || performance ? `<small>${escapeHtml(ref)}${ref && performance ? " " : ""}${performance ? `<b>Performance</b> ${escapeHtml(performance)}` : ""}</small>` : ""}
                  ${fps ? `<small>Est. FPS: ${escapeHtml(fps)}</small>` : ""}
                </span>
              </button>
              <span class="product-v2-config-option__price">
                <strong>${escapeHtml(configChoicePriceLabel(choice))}</strong>
                <button type="button" data-config-field-detail>+ Detalhes</button>
              </span>
              ${badge}
            </article>`;
        })
        .join("");
      field.append(menu);
      syncConfigFormField(key);
    });
  };

  const syncChoice = (choice) => {
    const key = choice.dataset.configKey;
    if (!key) return;
    const group = choice.closest("[data-config-group]");
    group?.querySelectorAll(`[data-config-choice][data-config-key="${key}"]`).forEach((item) => {
      const isSelected = item === choice;
      item.classList.toggle("is-selected", isSelected);
      item.querySelector("[data-config-select]")?.setAttribute("aria-checked", String(isSelected));
    });

    const name = choice.dataset.configName || "";
    const headerSummary = builder.querySelector(`[data-config-summary="${key}"]`);
    const heroSummary = document.querySelector(`[data-summary-value="${key}"]`);
    if (headerSummary) headerSummary.textContent = name;
    if (heroSummary) heroSummary.textContent = name;
    if (fieldMap[key]) detail.dataset[fieldMap[key]] = name;
    updateProductPriceDisplay(detail);
    syncConfigFormField(key);
  };

  renderConfigForm();
  builder.querySelectorAll("[data-config-choice].is-selected").forEach((choice) => {
    syncChoice(choice);
  });
  updateProductPriceDisplay(detail);

  summary?.addEventListener("click", (event) => {
    const row = event.target.closest("[data-summary-row]");
    if (!row || !summary.contains(row)) return;
    openSummaryDetail(row);
  });

  summary?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const row = event.target.closest("[data-summary-row]");
    if (!row || !summary.contains(row)) return;
    event.preventDefault();
    openSummaryDetail(row);
  });

  configForm?.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-config-field-toggle]");
    if (toggle) {
      const field = toggle.closest("[data-config-field]");
      const willOpen = !field.classList.contains("is-open");
      closeConfigDropdowns(willOpen ? field : null);
      return;
    }

    const detailButton = event.target.closest("[data-config-field-detail]");
    if (detailButton) {
      openDetailPanel(choiceFromConfigOption(detailButton.closest("[data-config-field-option]")));
      event.stopPropagation();
      return;
    }

    const option = event.target.closest("[data-config-field-option]");
    if (option) {
      const choice = choiceFromConfigOption(option);
      if (choice) syncChoice(choice);
      closeConfigDropdowns();
    }
  });

  document.addEventListener("click", (event) => {
    if (!configForm || configForm.contains(event.target)) return;
    closeConfigDropdowns();
  });

  builder.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-config-toggle]");
    if (toggle) {
      const group = toggle.closest("[data-config-group]");
      const willOpen = !group.classList.contains("is-open");
      group.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
      return;
    }

    const detailButton = event.target.closest("[data-config-detail]");
    if (detailButton) {
      openDetailPanel(detailButton.closest("[data-config-choice]"));
      return;
    }

    const selectButton = event.target.closest("[data-config-select]");
    if (selectButton) {
      syncChoice(selectButton.closest("[data-config-choice]"));
    }
  });

  document.querySelectorAll("[data-config-spec-detail]").forEach((button) => {
    button.addEventListener("click", () => openDetailPanel(button));
  });

  panel?.addEventListener("click", (event) => {
    if (event.target.closest("[data-config-detail-close]")) closeDetailPanel();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDetailPanel();
  });
}

sideMenuToggle?.addEventListener("click", () => {
  openPanel(sideMenu);
  sideMenuToggle.setAttribute("aria-expanded", "true");
});

sideMenuClose?.addEventListener("click", closeAllPanels);
scrim?.addEventListener("click", closeAllPanels);

filterToggle?.addEventListener("click", () => {
  openPanel(filtersPanel);
  filterToggle.setAttribute("aria-expanded", "true");
});

filterClose?.addEventListener("click", () => {
  filtersPanel?.classList.remove("is-open");
  filterToggle?.setAttribute("aria-expanded", "false");
  hideScrimIfIdle();
});

function scrollTopSales(direction) {
  if (!topSalesTrack) return;
  const amount = topSalesTrack.clientWidth * 0.85 * direction;
  topSalesTrack.scrollBy({ left: amount, behavior: "smooth" });
}

topSalesPrev?.addEventListener("click", () => scrollTopSales(-1));
topSalesNext?.addEventListener("click", () => scrollTopSales(1));

loginToggle?.addEventListener("click", () => openPanel(loginPopup));
loginClose?.addEventListener("click", () => {
  loginPopup?.classList.remove("is-open");
  hideScrimIfIdle();
});

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = loginForm.querySelector('button[type="submit"]');
  if (!submitButton) return;

  const originalText = submitButton.textContent;
  submitButton.textContent = "A validar...";
  submitButton.disabled = true;

  window.setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 900);
});

cartToggle?.addEventListener("click", () => openPanel(cartDrawer));
cartClose?.addEventListener("click", () => {
  cartDrawer.classList.remove("is-open");
  hideScrimIfIdle();
});

wishlistToggle?.addEventListener("click", () => openPanel(wishlistDrawer));
wishlistClose?.addEventListener("click", () => {
  wishlistDrawer.classList.remove("is-open");
  hideScrimIfIdle();
});

compareToggle?.addEventListener("click", () => openPanel(compareDrawer));
compareClose?.addEventListener("click", () => {
  compareDrawer.classList.remove("is-open");
  hideScrimIfIdle();
});

productGrid?.addEventListener("click", (event) => {
  const card = event.target.closest(".product-card");
  if (!card) return;

  const product = productFromCard(card);

  if (event.target.closest("[data-add-cart]")) {
    addCartItem(product);
    resetProtectionStep();
    showCart();
    return;
  }

  if (event.target.closest("[data-add-wishlist]")) {
    const exists = wishlistItems.some((item) => item.title === product.title);
    wishlistItems = exists ? wishlistItems : [...wishlistItems, product];
    renderWishlist();
    openPanel(wishlistDrawer);
    return;
  }

  if (event.target.closest("[data-add-compare]")) {
    const withoutCurrent = compareItems.filter((item) => item.title !== product.title);
    compareItems = [...withoutCurrent, product].slice(-2);
    renderCompare();
    openPanel(compareDrawer);
    return;
  }

  if (!event.target.closest("button, a, input, label, select, textarea")) {
    window.location.href = card.dataset.productUrl || "./produto.html";
  }
});

productDetail?.addEventListener("click", (event) => {
  const qtyButton = event.target.closest(".qty-stepper button");
  if (qtyButton) {
    const value = qtyButton.closest(".qty-stepper")?.querySelector("span");
    const current = Number(value?.textContent || 1);
    const next = qtyButton.getAttribute("aria-label")?.toLowerCase().includes("aumentar") ? current + 1 : Math.max(1, current - 1);
    if (value) value.textContent = String(next);
    return;
  }

  const product = productFromDetail(productDetail);

  const addDetailCartButton = event.target.closest("[data-add-detail-cart]");
  if (addDetailCartButton) {
    addCartItem(product);
    resetProtectionStep();
    if (addDetailCartButton.hasAttribute("data-buy-now")) {
      renderProtectionStep();
    } else {
      showCart();
    }
  }

  if (event.target.closest("[data-add-detail-wishlist]")) {
    const exists = wishlistItems.some((item) => item.title === product.title);
    wishlistItems = exists ? wishlistItems : [...wishlistItems, product];
    renderWishlist();
    openPanel(wishlistDrawer);
    return;
  }

  if (event.target.closest("[data-add-detail-compare]")) {
    const withoutCurrent = compareItems.filter((item) => item.title !== product.title);
    compareItems = [...withoutCurrent, product].slice(-2);
    renderCompare();
    openPanel(compareDrawer);
  }
});

cartFooter?.addEventListener("click", (event) => {
  if (event.target.closest("[data-checkout-button]")) {
    if (!cartItems.length) return;
    renderProtectionStep();
    return;
  }

  if (event.target.closest("[data-cart-continue]")) {
    cartDrawer?.classList.remove("is-open");
    hideScrimIfIdle();
    return;
  }

  if (event.target.closest("[data-protection-skip]")) {
    completeProtectionStep();
    showCart();
    return;
  }

  if (event.target.closest("[data-protection-continue]")) {
    completeProtectionStep(selectedProtectionsFromDrawer());
    showCart();
  }
});

cartBody?.addEventListener("click", (event) => {
  if (event.target.closest("[data-edit-protection]")) {
    renderProtectionStep();
    return;
  }

  const decreaseButton = event.target.closest("[data-cart-decrease]");
  if (decreaseButton) {
    const index = Number(decreaseButton.dataset.cartDecrease);
    const item = cartItems[index];
    if (!item) return;
    const quantity = Number(item.quantity || 1);
    if (quantity <= 1) {
      cartItems = cartItems.filter((_, itemIndex) => itemIndex !== index);
    } else {
      item.quantity = quantity - 1;
      cartItems = [...cartItems];
    }
    if (!cartItems.length) resetProtectionStep();
    renderCart();
    return;
  }

  const increaseButton = event.target.closest("[data-cart-increase]");
  if (increaseButton) {
    const index = Number(increaseButton.dataset.cartIncrease);
    const item = cartItems[index];
    if (!item) return;
    item.quantity = Number(item.quantity || 1) + 1;
    cartItems = [...cartItems];
    renderCart();
    return;
  }

  const removeButton = event.target.closest("[data-remove-cart]");
  if (!removeButton) return;

  const index = Number(removeButton.dataset.removeCart);
  cartItems = cartItems.filter((_, itemIndex) => itemIndex !== index);
  if (!cartItems.length) {
    resetProtectionStep();
  }
  renderCart();
});

wishlistBody?.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-wishlist]");
  if (!removeButton) return;

  const index = Number(removeButton.dataset.removeWishlist);
  wishlistItems = wishlistItems.filter((_, itemIndex) => itemIndex !== index);
  renderWishlist();
});

compareBody?.addEventListener("click", (event) => {
  if (!event.target.closest("[data-clear-compare]")) return;
  compareItems = [];
  renderCompare();
});

themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("theme-dark"));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeAllPanels();
});

window.addEventListener("resize", syncFooterPanels);

initTheme();
initProductQuickActions();
initCatalogFilters();
applyProductVariant();
initProductV2Columns();
initStickyBuyBarReveal();
initFinanceDropdown();
initProductV2LinkedRightScroll();
initProductConfigurator();
initProductOptions();
syncFooterPanels();
renderCart();
renderWishlist();
renderCompare();
