/**
 * ============================================
 * BENEDI - Carregador de textos (i18n pt-BR)
 * ============================================
 *
 * Busca os textos do site em assets/i18n/pt-br.json e
 * aplica em todos os elementos marcados com:
 *   data-i18n        -> substitui o texto simples (textContent)
 *   data-i18n-html    -> substitui o conteúdo com HTML (innerHTML),
 *                        usado quando o texto tem destaques <span>
 *
 * Se o arquivo JSON não puder ser carregado, o texto que já
 * está escrito no HTML permanece como está (fallback seguro).
 */

(function () {
  var JSON_PATH = 'assets/i18n/pt-br.json';

  /**
   * Busca um valor dentro do objeto de traduções usando um
   * caminho no formato "secao.subSecao.0.campo"
   */
  function getValue(data, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, data);
  }

  function applyTranslations(data) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = getValue(data, el.getAttribute('data-i18n'));
      if (typeof value === 'string') {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var value = getValue(data, el.getAttribute('data-i18n-html'));
      if (typeof value === 'string') {
        el.innerHTML = value;
      }
    });

    // Atributos (ex: data-i18n-attr-alt="secao.campo" -> define o atributo alt)
    document.querySelectorAll('[data-i18n-attr-alt]').forEach(function (el) {
      var value = getValue(data, el.getAttribute('data-i18n-attr-alt'));
      if (typeof value === 'string') {
        el.setAttribute('alt', value);
      }
    });
  }

  function loadTranslations() {
    fetch(JSON_PATH, { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Não foi possível carregar ' + JSON_PATH + ' (status ' + response.status + ')');
        }
        return response.json();
      })
      .then(applyTranslations)
      .catch(function (error) {
        console.warn('[i18n] Mantendo textos padrão do HTML. Detalhe:', error);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTranslations);
  } else {
    loadTranslations();
  }
})();
