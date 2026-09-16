
const homeButtons = document.querySelector(".home-buttons");

const productForm = document.getElementById("productForm");

const addBtn = document.getElementById("addProductBtn");

const editBtn = document.getElementById("editProductBtn");

const backBtn = document.getElementById("backBtn");
const downloadBtn = document.getElementById("downloadBtn");


// Add Product

addBtn.addEventListener("click", () => {

    homeButtons.style.display = "none";

    productForm.style.display = "flex";

});


// Back

backBtn.addEventListener("click", () => {

    productForm.style.display = "none";

    homeButtons.style.display = "flex";

});






// ==========================
// PRODUCT ID
// ==========================

let nextProductId = Number(
    localStorage.getItem("nextProductId")
) || 101;

const productIdInput = document.getElementById("productId");

// پہلی بار ID دکھاؤ
productIdInput.value = nextProductId;

// ==========================
// DOWNLOAD JSON
// ==========================

downloadBtn.addEventListener("click", () => {

    // Values
    const product = {

        id: Number(document.getElementById("productId").value),

        name: document.getElementById("productName").value,

       price: Number(document.getElementById("productPrice").value),

category: document.getElementById("productCategory").value,

images: document.getElementById("productImages")
    .value
    .split("\n")
    .map(img => img.trim())
    .filter(img => img !== "")
    .map(img => {
    if (
        img.toLowerCase().endsWith(".jpg") ||
        img.toLowerCase().endsWith(".png") ||
        img.toLowerCase().endsWith(".jpeg") ||
        img.toLowerCase().endsWith(".webp")
    ) {
        return "images/" + img;
    }

    return "images/" + img + ".jpg";
}),


         

        tags: document.getElementById("productTags")
            .value
            .split(",")
            .map(tag => tag.trim()),

        shortDescription: document.getElementById("shortDescription").value,

       longDescription: document.getElementById("longDescription").value

    };

    let json = JSON.stringify(product, null, 4);

// آخر میں comma لگا دو تاکہ سیدھا products.json میں Paste ہو جائے
json += ",";

    const blob = new Blob([json], {
        type: "application/json"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "product.json";

    link.click();

    // Next Auto ID
    localStorage.setItem(
        "nextProductId",
        product.id + 1
    );

    document.getElementById("productId").value =
        product.id + 1;

});


// ==========================
// LOAD SINGLE PRODUCT.JSON
// ==========================

document.getElementById("editProductBtn").addEventListener("click", () => {

    document.getElementById("jsonFile").click();

});

document.getElementById("jsonFile").addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const product = JSON.parse(e.target.result);

        homeButtons.style.display = "none";
        productForm.style.display = "flex";

        document.getElementById("productId").value = product.id || "";
        document.getElementById("productName").value = product.name || "";
        document.getElementById("productPrice").value = (product.price || "").replace("Rs. ", "");
        document.getElementById("productCategory").value = product.category || "";

        document.getElementById("productImages").value = (product.images || [])
            .map(img => img.replace("images/", ""))
            .join("\n");

        document.getElementById("productTags").value = (product.tags || []).join(", ");

        document.getElementById("shortDescription").value = product.shortDescription || "";

        document.getElementById("longDescription").value = product.longDescription || "";

    };

    reader.readAsText(file);

});