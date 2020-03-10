$(document).on('keyup', '.count', e => {
    const $model = $(e.target).closest('.model');
    
    const $truck = $(`<div class="truck">
        Véhicule <span class="truck-id">0</span>
    </div>`);

    $model.find('.truck').remove();
    
    const value = parseInt(e.target.value);
    
    for (let i = 0; i < value; i += 1) {
        $truck.find('.truck-id').html(i + 1);
        $model.find('details').append($truck.clone());
    }
});

$(document).on('click', '.input-number-wrap button', e => {
    const $el = $(e.target);
    const $input = $el.siblings('input');
    $input.val(Math.max(parseInt($input.val()) + ($el.hasClass('plus') ? 1 : -1), 1));
    $input.trigger('keyup');
});

$(document).on('click', '.model.add', () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const modelHTML = `<div class="model">
        <div class="row">
            <div>
                <h3>Silhouette <span class="model-id">${alphabet[$('.model').length - 1]}</span></h3>
            </div>
            <div class="noflex">
                <div class="input-number-wrap">
                    <button class="minus">-</button>
                    <input class="count" type="number" value="1" min="1" step="1">
                    <button class="plus">+</button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="input-wrap">
                <label for="">Info 1</label>
                <div class="select-wrap">
                    <select name="" id="">
                        <option value="" selected disabled>Sélectionnez…</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                    </select>
                </div>
            </div>
            <div class="input-wrap">
                <label for="">Info 2</label>
                <input type="text">
            </div>
            <div class="input-wrap">
                <label for="">Info 3</label>
                <input type="text">
            </div>
        </div>

        <div class="row">
            <div class="input-wrap">
                <label for="">Info 4</label>
                <input type="text">
            </div>
            <div class="input-wrap">
                <label for="">Info 5</label>
                <input type="text">
            </div>
            <div class="input-wrap">
                <label for="">Info 6</label>
                <input type="text">
            </div>
        </div>

        <details>
            <summary>Voir les véhicules</summary>

            <div class="truck">
                Véhicule <span class="truck-id">1</span>
            </div>
        </details>
    </div>`;

    $('.model.add').before(modelHTML);
});
