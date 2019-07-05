$(document).ready(pages);
function pages() {

    // Home page

    // Cart icon
    $('[data-toggle="tooltip"]').tooltip();

    // If the user click te Add to cart then make add function
    $('[data-add-to-cart]').click(add);

    function add(e) {

        // Ask the user via alert
        alert('Do you want to buy?');

        // Stop reload
        e.stopPropagation();
    }

    
    // Product page

    // Size 
    $('.product-option input[type="radio"]').change(size);
    function size() {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    }

    


    // Checkout page

    // Product remove
    $('[data-remove-from-cart]').click(button);
    function button() {
        $(this).parents('[data-product-info]').remove();
        
        // Re-calculate the total price after deleting a product
        calculateTotalPrice();
    }


    // When quantity changes
    $('[data-product-quantity]').change(when);

    function when() {

        // Bring the new quantity
        var newQuantity = $(this).val();

        // Find the line that contains the information for that product
        var $parent = $(this).parents('[data-product-info]');
        
        // Bring the price of one piece as default from the product information
        var pricePerUnit = $parent.attr('data-product-price');

        // Hit the specified number of product quantity with the default counter
        var totalPriceForProduct = newQuantity * pricePerUnit;

        // Show last price from here - script.js
        $parent.find('.total-price-for-product').text('€' + totalPriceForProduct + ',-');

        // Total event for all products
        calculateTotalPrice();
    }


    // Total priceing
    function calculateTotalPrice() {

        // Create a new variable to save the total price
        var totalPriceforAllProducts = 0;

        // Each line represents product information in a page
        $('[data-product-info]').each(pricing);

        function pricing() {

            // Bring the price of one piece as default.
            var pricePerUnit = $(this).attr('data-product-price');

            // Bring the desired product counter
            var quantity = $(this).find('[data-product-quantity]').val();

            // Hit the product counter with the price
            var totalPriceForProduct = pricePerUnit * quantity;

            // Total cumulative number
            totalPriceforAllProducts = totalPriceforAllProducts + (totalPriceForProduct);
        }
        // Show all the price on the page from here - script.js
        $('#total-price-for-all-product').text(totalPriceforAllProducts + '');

    }




    // Payment page

    // Create an new array
    var citiesByCountry = {
        nl: ['Amsterdam', 'Rotterdam', 'Kerkrade', 'Utercht', 'Ede GLD'],
        de: ['Berlin', 'Hamburg', 'Bavaria', 'Hesse', 'Saxony', 'Bremen'],
        be: ['Antwerp', 'Ghent', 'Charleroi', 'Bruges', 'Brussels'],
        fr: ['Paris', 'Marseille', 'Lyon', 'Nice', 'Nantes', 'Strasbourg']
    };

    
    // When the list of countrys changes
    $('#form-checkout select[name="country"]').change(country);

    function country() {

        // Get select[name="country"] => option tags => all value in it.
        var country = $(this).val();

        // get a Object => Property => Array
        var cities = citiesByCountry[country];

        

        // Make remove for all option tags in select[name="city"]
        $('#form-checkout select[name="city"]').empty();
        
        // Add new tag option in select[name="city"]
        $('#form-checkout select[name="city"]').append('<option disabled selected value="">City</option>');

        

        // for all value in Array
        cities.forEach(place);

        function place(city) {

            // make am new option tag
            var $newOption = $('<option></option>');

                $newOption.text(city);

                $newOption.val(city);

            $('#form-checkout select[name="city"]').append($newOption);

        }
    }



    // When change input[name="payment_method"] via click of user make the method function
    $('#form-checkout input[name="payment_method"]').change(method);


    function method() {

        // Get value="credit-card" and value="on_delivery"
        var paymentMethod = $(this).val();

        // if on_delivery is on_delivery
        if (paymentMethod === 'on_delivery') {

            // make then not woring in input te can user well write
            $('#credit-card-info input').prop('disabled', true);
        }

        // or if on_delivery is not on_delivery
        else {

            // make woring in input te can not user write
            $('#credit-card-info input').prop('disabled', false);
        }

        // make remove for all input if on_delivery is not on_delivery
        $('#credit-card-info').toggle();
    }
}

/*
┌──────────────────────────────────────────┐
│         Coding by M. Shikh Taleb         │
│            www.shikhtaleb.net            │
└──────────────────────────────────────────┘
*/