function createModel(id) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return `<div class="model">

        <div class="actions">
            <span>•••</span>
            <ul>
                <li data-action="copy">Dupliquer</li>
                <li data-action="delete">Supprimer</li>
            </ul>
        </div>

        <div class="row">
            <h3 contenteditable>Lot <span class="model-id">${alphabet[($('.model').length || 1) - 1]}</span></h3>
        </div>

        <div class="row">
            <h4>Configuration</h4>
        </div>

        <div class="row">
            <div>
                <label for="">Modèle</label>
                <div class="select-wrap">
                    <select name="" id="" required>
                        <option value="" selected disabled>Sélectionnez…</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                    </select>
                </div>
            </div>
            <div>
                <label for="">Essieux</label>
                <div class="input-wrap">
                    <input type="text">
                </div>
            </div>
            <div>
                <label for="">Variante</label>
                <div class="input-wrap">
                    <input type="text">
                </div>
            </div>
        </div>

        <div class="row">
            <h4>Usages</h4>
        </div>

        <div class="row">
            <div>
                <label for="">Topographie</label>
                <div class="select-wrap">
                    <select name="" id="" required>
                        <option value="" selected disabled>Sélectionnez…</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                    </select>
                </div>
            </div>
            <div>
                <label for="">Type d'usage</label>
                <div class="select-wrap">
                    <select name="" id="" required>
                        <option value="" selected disabled>Sélectionnez…</option>
                        <option value="a">Longue distance</option>
                        <option value="b">Transport</option>
                        <option value="c">Pompier</option>
                    </select>
                </div>
            </div>
            <div>
                <label for="">Huile</label>
                <div class="select-wrap">
                    <select name="" id="" required>
                        <option value="" selected disabled>Sélectionnez…</option>
                        <option value="a">Huile A</option>
                        <option value="b">Huile B</option>
                        <option value="c">Huile C</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row">
            <div>
                <label for=""><abbr title="Poids Total Roulant Autorisé">PTRA</abbr></label>
                <div class="input-wrap">
                    <input type="text">
                </div>
            </div>
            <div>
                <label for="">Kilométrage annuel</label>
                <div class="input-wrap" data-after="km">
                    <input type="number" min="0" step="1000">
                </div>
            </div>
            <div>
                <label for="">Heures moteur annuelles</label>
                <div class="input-wrap" data-after="h">
                    <input type="number" min="0" step="100">
                </div>
            </div>
        </div>

        <div class="row">
                <div></div>
                <div class="noflex">
                    <div class="input-number-wrap">
                        <button class="minus">-</button>
                        <input class="count" type="number" value="1" min="1" step="1">
                        <button class="plus">+</button>
                    </div>
                </div>
            </div>
            
            <details>
                <summary>Voir les véhicules</summary>

                <div class="truck">
                    Véhicule <span class="truck-id">1</span>
                </div>
            </details>
    </div>`;
}

function updateTotal() {
    let total = 0;
    $('.count').each((id, el) => {
        total += parseInt($(el).val());
    });
    $('.total-count').html(total);
}

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

    updateTotal();
});

$(document).on('click', '.input-number-wrap button', e => {
    const $el = $(e.target);
    const $input = $el.siblings('input');
    $input.val(Math.max(parseInt($input.val()) + ($el.hasClass('plus') ? 1 : -1), 1));
    $input.trigger('keyup');
});

$(document).on('click', '.model.add', () => {
    $('.model.add').before(createModel());
    updateTotal();
});

$(document).on('click', '.actions span', e => {
    $(e.target).closest('.actions').toggleClass('visible');
});