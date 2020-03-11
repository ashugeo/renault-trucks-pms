let step = 0;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const truckHTML = `<div class="truck">
    Véhicule <span class="truck-id">1</span>

    <div class="row none" data-none-step="1">
        <div>
            <label for=""><abbr title="Vehicle Identification Number">VIN</abbr></label>
            <div class="input-wrap">
                <input type="text" data-disable-step="135" required disabled>
            </div>
        </div>
        <div>
            <label for="">Immatriculation</label>
            <div class="input-wrap">
                <input type="text" data-disable-step="125" required disabled>
            </div>
        </div>
    </div>

    <div class="row none" data-none-step="1235">
        <a href="/pms.pdf" target="_blank" download="PMS Véhicule 1"><button class="button-primary">Télécharger le PMS <span class="down">↓</span></button></a>

        <a href="mailto:?subject=Nouveau PMS attribué à votre concession&body=Bonjour,%0D%0A%0D%0AUn nouveau PMS a été attribué à votre concession.%0D%0AVeuillez cliquer sur ce lien pour le télécharger : ${location.href}pms.pdf"><button class="button-primary">Envoyer le PMS par email <span class="right">→</span></button></a>
    </div>

</div>`;

function createModel(id) {
    return `<div class="model">

        <div class="actions" data-hide-step="2345">
            <span>•••</span>
            <ul>
                <li data-action="copy">Dupliquer</li>
                <li data-action="delete">Supprimer</li>
            </ul>
        </div>

        <div class="row">
            <h3 contenteditable>Lot <span class="model-id">${alphabet[($('.model').length || 1) - 1]}</span></h3>
        </div>

        <details class="config" open data-open-step="145">
            <summary>Configuration</summary>

            <div class="row">
                <div>
                    <label for="">Modèle</label>
                    <div class="select-wrap">
                        <select name="" id="" data-disable-step="235" required>
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
                        <input type="text" data-disable-step="235" required>
                    </div>
                </div>
                <div>
                    <label for="">Variante</label>
                    <div class="input-wrap">
                        <input type="text" data-disable-step="235" required>
                    </div>
                </div>
            </div>

            <div class="row">
                <div>
                    <label for="">Topographie</label>
                    <div class="select-wrap">
                        <select name="" id="" data-disable-step="235" required>
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
                        <select name="" id="" data-disable-step="235" required>
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
                        <select name="" id="" data-disable-step="235" required>
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
                        <input type="text" data-disable-step="235" required>
                    </div>
                </div>
                <div>
                    <label for="">Kilométrage annuel</label>
                    <div class="input-wrap" data-after="km">
                        <input type="number" min="0" data-disable-step="235" required>
                    </div>
                </div>
                <div>
                    <label for="">Heures moteur annuelles</label>
                    <div class="input-wrap" data-after="h">
                        <input type="number" min="0" data-disable-step="235" required>
                    </div>
                </div>
            </div>

            <div class="row">
                <div>
                    <label for="">Contact concessionnaire</label>
                    <div class="input-wrap">
                        <input type="text" class="dealer-name" data-disable-step="235" required>
                    </div>
                </div>
                <div>
                    <label for="">Mail concessionnaire</label>
                    <div class="input-wrap">
                        <input type="mail" class="dealer-mail" data-disable-step="235" required>
                    </div>
                </div>
            </div>
        </details>

        <div class="row">
            <div></div>
            <div class="noflex">
                <div class="input-number-wrap" data-hide-step="2345">
                    <button class="minus">-</button>
                    <input class="count" type="number" value="1" min="1" step="1">
                    <button class="plus">+</button>
                </div>
            </div>
        </div>
            
        <details class="trucks" data-open-step="2345">
            <summary>1 véhicule</summary>
            ${truckHTML}
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

function changeStep() {
    $('header ul li.active').removeClass('active last');
    for (let i = 0; i <= step; i += 1) {
        $(`header ul li:nth-child(${i + 1})`).addClass('active');
        if (i === step) $(`header ul li:nth-child(${i + 1})`).addClass('last');
    }

    $('aside button').html(['Valider la commande', 'Valider les VIN', 'Valider les immatriculations', 'Valider les PMS', ''][step]);

    $(`[data-hide-step*=${step + 1}]`).addClass('hidden');
    $(`[data-hide-step]:not([data-hide-step*=${step + 1}])`).removeClass('hidden');

    $(`[data-none-step*=${step + 1}]`).addClass('none');
    $(`[data-none-step]:not([data-none-step*=${step + 1}])`).removeClass('none');

    $(`[data-disable-step*=${step + 1}]`).attr('disabled', 'true');
    $(`[data-disable-step]:not([data-disable-step*=${step + 1}])`).removeAttr('disabled');

    $(`[data-open-step*=${step + 1}]`).attr('open', 'true');
    $(`[data-open-step]:not([data-open-step*=${step + 1}])`).removeAttr('open');
}

$(document).on('keyup', '.count', e => {
    const $model = $(e.target).closest('.model');
    
    const $truck = $(`<div class="truck">
        Véhicule <span class="truck-id">0</span>
    </div>`);

    $model.find('.truck').remove();
    
    const value = parseInt(e.target.value);

    $model.find('details.trucks summary').html(`${value} véhicule${value > 1 ? 's' : ''}`)
    
    for (let i = 0; i < value; i += 1) {
        const $truck = $(truckHTML)
        $truck.find('.truck-id').html(i + 1);
        $truck.find('a[download]').attr('download', `PMS Véhicule ${i + 1}`);
        $model.find('.trucks').append($truck);
    }

    updateTotal();
});

$(document).on('click', '.input-number-wrap button', e => {
    const $el = $(e.target);
    const $input = $el.siblings('input');
    $input.val(Math.max(parseInt($input.val()) + ($el.hasClass('plus') ? 1 : -1), 1));
    $input.trigger('keyup');
});

function updateProgress() {
    const fields = $('input[required]:not([disabled]):invalid, select[required]:not([disabled]):invalid').length;
    const allFields = $('input[required]:not([disabled]), select[required]:not([disabled])').length;

    const progress = 100 - Math.round(fields / allFields * 100);
    $('.progress label span').html(`${progress}% (${allFields - fields}/${allFields})`);
    $('.progress .progress-bar div').css('width', `${progress}%`);

    if (progress === 100) $('aside button.button-primary').removeAttr('disabled');
    else $('aside button.button-primary').attr('disabled', true);
}

$(document).on('change keyup', 'input, select', e => {
    updateProgress();
});

$(document).on('change', 'select', e => {
    const $el = $(e.target);
    $el.find(`option[value="${$el.val()}"]`).attr('selected', true);
});

$(document).on('click', '.model.add', () => {
    $('.model.add').before(createModel());
    updateTotal();
    updateProgress();
});

$(document).on('click', '.actions span', e => {
    $(e.target).closest('.actions').toggleClass('visible');
});

$(document).on('click', '[data-action]', e => {
    const $el = $(e.target);
    const action = $el.attr('data-action');
    const $model = $el.closest('.model');

    if (action === 'copy') {
        $el.closest('.actions').toggleClass('visible');
        const $new = $model.clone();

        $new.find('.model-id').parent().html(`Copie de ${$new.find('.model-id').parent().html()}`);
        $model.after($new);
    } else if (action === 'delete') {
        $model.remove();
    }

    updateProgress();
});

$(document).on('click', 'header ul li', e => {
    const $li = $(e.target).closest('li');
    step = $li.index();

    changeStep();
    updateProgress();
});

$(document).on('keyup', '.dealer-mail', e => {
    const value = e.target.value;
    const $model = $(e.target).closest('.model');
    
    let mailto = $model.find('a[href^="mailto"]').attr('href');
    mailto = mailto.replace(/mailto:[\w @\.]*\?/, `mailto:${value}?`);
    $model.find('a[href^="mailto"]').attr('href', mailto);
});

$(document).on('keyup', '.dealer-name', e => {
    const value = e.target.value;
    const $model = $(e.target).closest('.model');
    
    let mailto = $model.find('a[href^="mailto"]').attr('href');
    mailto = mailto.replace(/Bonjour[ \w]*\,/g, `Bonjour ${value},`);
    $model.find('a[href^="mailto"]').attr('href', mailto);
});

$(document).on('click', 'aside button', () => {
    step += 1;
    changeStep();
    updateProgress();
});