(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const n of s)
      if (n.type === 'childList')
        for (const o of n.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(s) {
    const n = {};
    return (
      s.integrity && (n.integrity = s.integrity),
      s.referrerPolicy && (n.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : s.crossOrigin === 'anonymous'
        ? (n.credentials = 'omit')
        : (n.credentials = 'same-origin'),
      n
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const n = a(s);
    fetch(s.href, n);
  }
})();
const b = () => {
  const e = document.getElementById('root');
  e &&
    e.insertAdjacentHTML(
      'beforeend',
      `   <div class="upload-file">
      <div class="upload-file__container">
        <form class="upload-file__form ">
          <div class="upload-file__wrapper-input">
            <input hidden id="file-input" type="file" name="Файлы" accept="image/png, image/jpeg, image/jpg,"
              class="upload-file__input" multiple>
            <label class="upload-file__label btn" for="file-input">
              <span>Загрузить изображения</span>
            </label>
          </div>
          <div class="upload-file__info info-upload">
            <h1>Добавить файлы</h1>
            <ul>
              <li>Правила загрузки файлов:</li>
              <li>Максимальный размер одного файла — <b>10 MB.</b></li>
              <li>Допустимые форматы файлов: <b>JPG, JPEG, PNG</b></li>
              <li>Можно загрузить максимум <b>5</b> файлов.</li>
            </ul>
            <ul>
              <li>Подсказка:</li>
              <li>Просто перетащите файл в окно браузера.</li>
              <li>Наведите курсор на файл для увеличения.</li>
            </ul>

            <button type="submit" class="btn">Отправить</button>
          </div>
        </form>
        <ul class="upload-file__list list-load"></ul>
      </div>
    </div>
    <div class="toast"></div>`
    );
};
const g = (e) =>
  e.length === 0
    ? 0
    : Math.max.apply(
        null,
        Array.from(e).map((t) => Number(t.id.replace(/[^\d]/g, '')))
      );
const E = (e) => {
  const t = document.querySelector(`#${e} span[data-name]`).dataset.name;
  const a = document.getElementById('file-input');
  const s = Array.from(a.files)
    .map((o) => {
      if (!t.includes(o.name)) return o;
    })
    .filter((o) => o !== void 0);
  const n = new DataTransfer();
  s.forEach((o) => {
    n.items.add(o);
  }),
    (a.files = n.files);
};
const _ = (e) => {
  e.addEventListener('click', (t) => {
    const { target: a } = t;
    a.classList.contains('list-load__btn') &&
      (E(a.parentElement.id),
      document.getElementById(a.parentElement.id).remove()),
      e.children.length === 0 && e.classList.remove('_show');
  });
};
const L = (e, t) => {
  const a = Array.from(e.files);
  if (a.length === 0) return;
  const r = Array.from(t.children).map(
    (o) => o.querySelector('li span[data-name]').dataset.name
  );
  const s = a.map((o, i) => a.filter((c) => c.name === r[i]).pop());
  const n = new DataTransfer();
  s.forEach((o) => {
    n.items.add(o);
  }),
    (e.files = n.files);
};
const w = (e) => {
  e.length !== 0 &&
    (Array.from(e.children).forEach((t) => t.remove()),
    e.classList.remove('_show'));
};
function D(e, t) {
  const { name: a, size: r } = e;
  const s = a.split('.');
  const n = `${(Number(r) / 1048576).toFixed(2)} MB`;
  [s[0], n, s[1].toUpperCase()].forEach((i, c) => {
    const d = document.createElement('span');
    c === 0 && (d.dataset.name = a), (d.innerText = i), t.appendChild(d);
  });
  const o = document.createElement('button');
  o.classList.add('list-load__btn'), (o.type = 'button'), t.appendChild(o);
}
function S(e, t) {
  const a = document.createElement('span');
  t.prepend(a);
  const r = e.cloneNode(!0);
  a.appendChild(r);
}
const h = (e, t) => {
  if (e.length === 0) return;
  t.classList.add('_show');
  let a = g(t.children);
  e.forEach((r) => {
    const s = new FileReader();
    const n = document.createElement('li');
    (n.draggable = !0),
      (n.id = `loadFile-${(a += 1)}`),
      n.classList.add('list-load__item');
    const o = document.createElement('img');
    o.draggable = !1;
    const i = document.createElement('span');
    i.appendChild(o),
      (s.onload = () => {
        o.setAttribute('src', s.result), S(o, n), n.prepend(i);
      }),
      D(r, n),
      t.appendChild(n),
      s.readAsDataURL(r);
  });
};
const T = (e) => {
  const t = document.getElementById(`toast-${e}`);
  setTimeout(() => {
    t.remove();
  }, 1e4),
    setTimeout(() => {
      t.firstElementChild.classList.add('_lineProgress');
    }, 30);
};
const f = (e, t = !1) => {
  const a = document.querySelector('.toast');
  let r = g(a.children);
  a &&
    e.forEach((s) => {
      a.insertAdjacentHTML(
        'beforeend',
        ` <div class="toast__item" id="toast-${(r += 1)}" >
      			<div class="toast__wrapper-item ${
              t ? '_success' : ''
            }"> <span> ${s}</span></div>
    			</div>`
      ),
        T(r);
    });
};
const u = [];
const v = () => {
  f(u), (u.length = 0);
};
const m = (e) => {
  u.push(e);
};
const A = (e, t) => {
  const a = Array.from(t.querySelectorAll('li')).map(
    (s) => s.querySelector('span[data-name]').dataset.name
  );
  return e
    .map((s) => {
      if (a.includes(s.name)) {
        m(
          `<b>Ошибка:</b> Изображение с таким ${s.name} именем уже существует.`
        );
        return;
      }
      return s;
    })
    .filter((s) => s !== void 0);
};
const F = (e, t) => {
  const a = t.children.length;
  const r = 5;
  return (
    a + e.length >= r + 1 &&
      m(
        '<b>Ошибка:</b> Превышено допустимое количество изображений: максимум 5.'
      ),
    a ? A(e, t).slice(0, r - a) : e.length <= 5 ? e : e.slice(0, r)
  );
};
const B = (e) =>
  e
    .map((r) => {
      if (r.size < 10485760) return r;
      m(
        `<b>Ошибка:</b> Файл "${r.name}" не загружен: превышен размер изображения.`
      );
    })
    .filter((r) => r !== void 0);
const I = (e) => {
  const t = ['jpg', 'jpeg', 'png'];
  return e
    .map((r) => {
      const s = r.type.lastIndexOf('/');
      const n = r.type.slice(s + 1);
      if (t.includes(n)) return r;
      m(
        '<b>Ошибка:</b> Неверный формат файла. Разрешены только JPG,JPEG, PNG.'
      );
    })
    .filter((r) => r !== void 0);
};
const y = (e, t) => {
  const a = F(e, t);
  if (a.length === 0) return [];
  const r = B(a);
  return r.length === 0 ? [] : I(r);
};
const x = (e, t) => {
  document.addEventListener('change', () => {
    const a = y(Array.from(e.files), t);
    h(a, t), v();
  }),
    _(t);
};
const N = (e, t) => {
  setTimeout(() => {
    e.classList.remove('_preloader'),
      t.classList.remove('_preloader'),
      w(t),
      f(['Отправлено успешно.'], !0);
  }, 1e3);
};
const P = (e, t) => {
  const a = document.querySelector('.upload-file__form');
  a.addEventListener('submit', (r) => {
    r.preventDefault(), L(e, t);
    const s = new FormData();
    if (e.files.length === 0) {
      f(['<b>Ошибка:</b> Файлы не загружены. Попробуйте снова.']);
      return;
    }
    for (let n = 0; n < e.files.length; n += 1) s.append('files', e.files[n]);
    a.classList.add('_preloader'),
      t.classList.add('_preloader'),
      fetch('http://localhost:3000/upload', { method: 'POST', body: s })
        .then((n) => {
          if (!n.ok) throw new Error('Сетевая ошибка');
          return n.json();
        })
        .then((n) => {
          N(a, t), (e.value = ''), console.log('Ответ от сервера:', n);
        })
        .catch((n) => {
          console.error('Ошибка:', n),
            console.error(
              'Ошибка:',
              'нужно скачать сервер с репозитория https://github.com/DenisGrishin/node_server'
            );
        });
  });
};
const l = document.getElementById('root');
const p = (e) => {
  e.preventDefault(),
    e.stopPropagation(),
    document.getElementById('root').classList.add('_active');
};
const q = (e) => {
  if (!l) return;
  const t = (r) => {
    r.preventDefault(), r.stopPropagation(), l.classList.remove('_active');
  };
  const a = (r) => {
    r.preventDefault(), r.stopPropagation(), l.classList.remove('_active');
    const s = r.dataTransfer;
    const { files: n } = s;
    const o = y(Array.from(n), e);
    h(o, e), v();
  };
  l.addEventListener('dragover', p, !1),
    l.addEventListener('dragleave', t, !1),
    l.addEventListener('drop', a, !1);
};
const M = (e) => {
  const t = document.getElementById('root');
  const a = (n) => {
    n.preventDefault();
    const o = e.querySelector('._chosen');
    document.getElementById('root').classList.remove('_active');
    const i = n.target;
    if (!(o !== i && i.classList.contains('list-load__item'))) return;
    const d = i === o.nextElementSibling ? i.nextElementSibling : i;
    e.insertBefore(o, d);
  };
  const r = (n) => {
    n.target.classList.remove('_chosen'), t.addEventListener('dragover', p, !1);
  };
  const s = (n) => {
    n.target.classList.add('_chosen'), t.removeEventListener('dragover', p);
  };
  e.addEventListener('dragover', a),
    e.addEventListener('dragend', r),
    e.addEventListener('dragstart', s);
};
b();
if (document.querySelector('.upload-file')) {

  const e = document.getElementById('file-input');
  const t = document.querySelector('.list-load');
  x(e, t), q(t), P(e, t), M(t);
}
