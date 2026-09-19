// ==========================
// WEBSITE CONFIGURATION
// ==========================

const websites = {

    "touchonscreen.com": {
        name: "touchonscreen.com",
        number: ""
    },

    "marvi.site": {
        name: "marvi.site",
        number: ""
    }

};


// ==========================
// WEBSITE + CATEGORY LOADING
// ==========================

const websiteSelect = document.getElementById("websiteSelect");
const categorySelect = document.getElementById("productCategory");

function loadWebsiteCategories() {

    if (!websiteSelect || !categorySelect) return;

    const website = websiteSelect.value;

    categorySelect.innerHTML =
        '<option value="">Select Category</option>';

    if (
        !website ||
        !window.websiteCategories ||
        !window.websiteCategories[website]
    ) {
        return;
    }

    const categories = window.websiteCategories[website];

    Object.keys(categories).forEach(mainCategory => {

        // Main Category
        const mainOption = document.createElement("option");

        mainOption.value = mainCategory;
        mainOption.textContent =
            mainCategory.replace(/-/g, " ");

        categorySelect.appendChild(mainOption);


        // Sub Categories
        categories[mainCategory].forEach(subCategory => {

            const subOption = document.createElement("option");

            subOption.value = subCategory;
            subOption.textContent =
                "— " + subCategory.replace(/-/g, " ");

            categorySelect.appendChild(subOption);

        });

    });

}


// Website Change
if (websiteSelect) {

    websiteSelect.addEventListener("change", function () {

        loadWebsiteCategories();

    });

}


// ==========================
// HOME / FORM
// ==========================

const homeSubtitle = document.querySelector(".home-subtitle");
const homeButtons = document.querySelector(".home-buttons");

const productForm = document.getElementById("productForm");

const addBtn = document.getElementById("addProductBtn");

const editBtn = document.getElementById("editProductBtn");

const backBtn = document.getElementById("backBtn");
const downloadBtn = document.getElementById("downloadBtn");


// ==========================
// ADD PRODUCT
// ==========================

addBtn.addEventListener("click", () => {

    homeSubtitle.style.display = "none";
    homeButtons.style.display = "none";

    productForm.style.display = "flex";

});


// ==========================
// BACK
// ==========================

backBtn.addEventListener("click", () => {

    productForm.style.display = "none";

    homeSubtitle.style.display = "block";
    homeButtons.style.display = "flex";

});


// ==========================
// PRODUCT ID
// ==========================

let nextProductId = Number(
    localStorage.getItem("nextProductId")
) || 101;

const productIdInput =
    document.getElementById("productId");

// Pehli baar ID dikhao
productIdInput.value = nextProductId;


// ==========================
// DOWNLOAD JSON
// ==========================

downloadBtn.addEventListener("click", () => {

    const product = {

        id: Number(
            document.getElementById("productId").value
        ),

        name:
            document.getElementById("productName").value,

        price:
            Number(
                document.getElementById("productPrice").value
            ),

        category:
            document.getElementById("productCategory").value,

        images:
            document.getElementById("productImages")
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

                    return "images/" + img + ".webp";

                }),

        tags:
            document.getElementById("productTags")
                .value
                .split(",")
                .map(tag => tag.trim()),

        shortDescription:
            document.getElementById("shortDescription").value,

        longDescription:
            document.getElementById("longDescription").value

    };


    let json = JSON.stringify(product, null, 4);

    // Products.json mein direct paste karne ke liye comma
    json += ",";


    const blob = new Blob(
        [json],
        {
            type: "application/json"
        }
    );


    const link = document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "product.json";

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

document.getElementById("editProductBtn")
    .addEventListener("click", () => {

        document.getElementById("jsonFile").click();

    });


document.getElementById("jsonFile")
    .addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;


        const reader = new FileReader();


        reader.onload = function (e) {

            const product =
                JSON.parse(e.target.result);


            homeSubtitle.style.display = "none";
            homeButtons.style.display = "none";

            productForm.style.display = "flex";


            // Website

            if (product.website && websiteSelect) {

                websiteSelect.value =
                    product.website;

                loadWebsiteCategories();

            }


            // Product Fields

            document.getElementById("productId").value =
                product.id || "";

            document.getElementById("productName").value =
                product.name || "";

            document.getElementById("productPrice").value =
                product.price || "";


            document.getElementById("productCategory").value =
                product.category || "";


            document.getElementById("productImages").value =
                (product.images || [])
                    .map(img =>
                        img.replace("images/", "")
                    )
                    .join("\n");


            document.getElementById("productTags").value =
                (product.tags || [])
                    .join(", ");


            document.getElementById("shortDescription").value =
                product.shortDescription || "";


            document.getElementById("longDescription").value =
                product.longDescription || "";

        };


        reader.readAsText(file);

    });