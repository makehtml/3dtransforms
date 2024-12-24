---

title: Переворот карточки
layout: doc
category: docs
slug: card
redirect_from:
  - "/docs/card-flip.html"
  - "/examples/card-01.html"
  - "/examples/card-02-slide-flip.html"
  - "/examples/card-03-slide-flip-2-ways.html"
  - "/examples/transforms-03-origin.html"

---

Теперь у нас есть все инструменты, чтобы начать создавать 3D-объекты. Давайте начнем с основ — переворота карточки.

Вот базовая разметка, которую нам нужно использовать:

{% highlight html %}
<div class="scene">
  <div class="card">
    <div class="card__face card__face--front">лицевая</div>
    <div class="card__face card__face--back">задняя</div>
  </div>
</div>
{% endhighlight %}

<div class="scene">
  <div class="card card--step0">
    <div class="card__face card__face--front">лицевая</div>
    <div class="card__face card__face--back">задняя</div>
  </div>
</div>

Элемент `.scene` будет служить контейнером для 3D-пространства. Элемент `.card` действует как 3D-объект. Два отдельных элемента `.card__face` используются для лиц карточки. Я рекомендую использовать эту же структуру для любых 3D-преобразований: сцена, объект и грани. Разделение элемента 3D-пространства и объекта помогает установить понятную модель, которую проще стилизовать.

Теперь мы готовы к 3D-стилизации. Сначала применим необходимую перспективу для контейнера 3D-пространства, а также любые стили для размеров и позиционирования.

{% highlight css %}
.scene {
  width: 200px;
  height: 260px;
  perspective: 600px;
}
{% endhighlight %}

Теперь элемент `.card` можно трансформировать в 3D-пространстве его родительского элемента. Мы добавим `width: 100%;` и `height: 100%;`, чтобы `transform-origin` карточки располагался в центре контейнера. Подробнее о `transform-origin` позже. Свойство `position: relative` используется для того, чтобы позиционировать грани карточки абсолютно.

Добавим переход CSS3, чтобы пользователи могли увидеть, как преобразование вступает в силу.

{% highlight css %}
.card {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
}
{% endhighlight %}

Перспектива элемента применяется только к его непосредственным потомкам, в данном случае — к элементу `.card`. Чтобы последующие дочерние элементы унаследовали перспективу родителя и находились в одном 3D-пространстве, родитель может передать свою перспективу с помощью `transform-style: preserve-3d`. Без этого свойства 3D-преобразования, грани карточки будут сплющены вместе с родителем, и вращение задней грани будет отменено.

Чтобы позиционировать грани в 3D-пространстве, нам нужно сбросить их позиции в 2D с помощью `position: absolute`. Для того, чтобы скрыть заднюю сторону граней, когда они обращены от зрителя, используем `backface-visibility: hidden`.

{% highlight css %}
.card__face {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
}
{% endhighlight %}

Чтобы перевернуть `.card__face--back`, добавляем базовое 3D-преобразование `rotateY(180deg)`.

{% highlight css %}
.card__face--front {
  background: red;
}

.card__face--back {
  background: blue;
  transform: rotateY( 180deg );
}
{% endhighlight %}

Когда грани установлены на свои места, для элемента `.card` требуется соответствующий стиль-модификатор, когда он перевернут.

{% highlight css %}
.card.is-flipped {
  transform: rotateY(180deg);
}
{% endhighlight %}

Теперь у нас есть рабочий 3D-объект. Чтобы перевернуть карточку, мы можем переключить класс `is-flipped`. Когда применяется класс `.is-flipped`, элемент `.card` вращается на 180 градусов, таким образом, открывая `.card__face--back`.

<div class="demo demo--card-flip">
  <div class="scene scene--card">
    <div class="card">
      <div class="card__face card__face--front">лицевая</div>
      <div class="card__face card__face--back">задняя</div>
    </div>
  </div>
  <p>Нажмите на карточку, чтобы перевернуть её.</p>
</div>
<script>
(() => {
  const card = document.querySelector('.demo--card-flip .card');
  card.addEventListener( 'click', () => {
    card.classList.toggle('is-flipped');
  });
})();
</script>

{% include edit-codepen.html pen_slug="LmWoWe" %}

![3D-переворот карточки](./img/card-flip01.png)

## Переворот карточки

Посмотрите ещё раз на 3D-переход Weather App. Вы заметите, что это не совсем тот же эффект, что в нашем предыдущем примере. Если проследить правый край карточки, вы увидите, что он остаётся на одном уровне с контейнером. Вместо того, чтобы вращаться от горизонтального центра, карточка вращается вокруг правого края. Но переход — это не просто вращение: край перемещается горизонтально справа налево. Мы можем воспроизвести этот переход, просто изменив несколько строк CSS из нашего первоначального примера переворота карточки.

Точка вращения для вращения находится на правой стороне карточки. По умолчанию, `transform-origin` элемента расположен в его горизонтальном и вертикальном центре (`50% 50%` или `center center`). Преобразования элемента применяются относительно его `transform-origin`. Давайте изменим его на правую сторону:

{% highlight css %}
.card { transform-origin: center right; }
{% endhighlight %}

Теперь для переворота нужно добавить горизонтальное движение с помощью `translateX`. Мы установим вращение на `-180deg`, чтобы карточка перевернулась лицевой стороной наружу.

{% highlight css %}
.card.is-flipped {
  transform: translateX(-100%) rotateY(-180deg);
}
{% endhighlight %}

<div class="demo demo--card-slide-flip">
  <div class="scene scene--card">
    <div class="card card--slide">
      <div class="card__face card__face--front">лицевая</div>
      <div class="card__face card__face--back">задняя</div>
    </div>
  </div>
  <p>Нажмите на карточку, чтобы перевернуть её.</p>
</div>
<script>
(() => {
  const card = document.querySelector('.demo--card-slide-flip .card');
  card.addEventListener( 'click', () => {
    card.classList.toggle('is-flipped');
  });
})();
</script>

{% include edit-codepen.html pen_slug="LmWozd" %}

![3D-переворот карточки](./img/card-flip02.png)

* * *

[**Далее: Куб &rarr;**](cube)
