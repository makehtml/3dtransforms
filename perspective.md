---

title: Перспектива
layout: doc
slug: perspective
script: perspective.js
redirect_from:
  - "/docs/perspective.html"
  - "/examples/perspective-01.html"
  - "/examples/perspective-02-children.html"
  - "/examples/perspective-03.html"

---


### Перспектива

Чтобы активировать 3D-пространство, элементу необходима перспектива. Это можно сделать двумя способами.

Первая техника — использование [свойства `transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) с функцией `perspective()`:


{% highlight css %}
transform: perspective(400px);
{% endhighlight %}

Например:

{% highlight css %}
.panel--red {
  /* функция perspective в свойстве transform */
  transform: perspective(400px) rotateY(45deg);
}
{% endhighlight %}

<div class="scene scene--set-persp">
  <div class="set-persp-panel set-persp-panel--red"></div>
</div>

{% include edit-codepen.html pen_slug="XqMGRB" %}

Вторая техника — использование [свойства `perspective`](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective):

{% highlight css %}
perspective: 400px;
{% endhighlight %}

Например:

{% highlight css %}
.scene--blue {
  /* свойство perspective */
  perspective: 400px;
}

.panel--blue {
  transform: rotateY(45deg);
}
{% endhighlight %}

<div class="scene scene--set-persp scene--set-persp--blue">
  <div class="set-persp-panel set-persp-panel--blue"></div>
</div>

{% include edit-codepen.html pen_slug="PepLOz" %}

Обе эти техники активируют 3D-пространство и могут дать одинаковый визуальный результат. Однако есть одно отличие. Функциональная нотация удобна для прямого применения 3D-преобразований к отдельному элементу (в красном примере я использую её в сочетании с трансформацией rotateY). Таким образом, это можно использовать как сокращение для 3D-преобразования одного элемента.

Но когда применяется к нескольким элементам, эффект не срабатывает. Преобразованные элементы не выстраиваются друг с другом. Это происходит потому, что у каждого элемента своя перспектива и точка схода. Чтобы этого избежать, применяйте свойство perspective к родительскому элементу, чтобы дочерние элементы могли разделять одно и то же 3D-пространство.

{% highlight css %}
.panel--separate {
  transform: perspective(400px) rotateY(45deg);
}
{% endhighlight %}

<div class="scene scene--persp-children">
  <div class="persp-children-panel persp-children-panel--separate"></div>
  <div class="persp-children-panel persp-children-panel--separate"></div>
  <div class="persp-children-panel persp-children-panel--separate"></div>
  <div class="persp-children-panel persp-children-panel--separate"></div>
  <div class="persp-children-panel persp-children-panel--separate"></div>
  <div class="persp-children-panel persp-children-panel--separate"></div>
  <div class="persp-children-panel persp-children-panel--separate"></div>
  <div class="persp-children-panel persp-children-panel--separate"></div>
  <div class="persp-children-panel persp-children-panel--separate"></div>
</div>

{% include edit-codepen.html pen_slug="WJpmdO" %}

{% highlight css %}
.scene--together {
  perspective: 400px;
}

.panel--together {
  transform: rotateY(45deg);
}
{% endhighlight %}

<div class="scene scene--persp-children scene--persp-children--together">
  <div class="persp-children-panel persp-children-panel--together"></div>
  <div class="persp-children-panel persp-children-panel--together"></div>
  <div class="persp-children-panel persp-children-panel--together"></div>
  <div class="persp-children-panel persp-children-panel--together"></div>
  <div class="persp-children-panel persp-children-panel--together"></div>
  <div class="persp-children-panel persp-children-panel--together"></div>
  <div class="persp-children-panel persp-children-panel--together"></div>
  <div class="persp-children-panel persp-children-panel--together"></div>
  <div class="persp-children-panel persp-children-panel--together"></div>
</div>

{% include edit-codepen.html pen_slug="MGpxVG" %}

Значение свойства `perspective` определяет интенсивность 3D-эффекта. Представьте это как расстояние между зрителем и объектом. Чем больше значение, тем дальше объект, и тем менее заметным будет эффект. Например, `perspective: 2000px` даёт лёгкий 3D-эффект, как если бы мы смотрели на объект через бинокль издалека. А вот `perspective: 100px` создаёт потрясающий эффект, как если бы крошечное насекомое рассматривало гигантский объект.

Также можно использовать 3D-преобразования без перспективы, установив `perspective: none` или не задавая свойство `perspective` вообще. Без перспективы параллельные плоскости становятся ортогональными и не имеют точки схода.

По умолчанию точка схода для 3D-пространства расположена в центре. Вы можете изменить положение этой точки с помощью свойства [`perspective-origin`](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin).

{% highlight css %}

perspective-origin: 25% 75%;

{% endhighlight %}

<div class="demo demo--persp-cube">
  <div class="scene scene--cube scene--persp-cube">
    <div class="cube is-spinning">
      <div class="cube__face cube__face--front">лицевая</div>
      <div class="cube__face cube__face--back">задняя</div>
      <div class="cube__face cube__face--right">правая</div>
      <div class="cube__face cube__face--left">левая</div>
      <div class="cube__face cube__face--top">верхняя</div>
      <div class="cube__face cube__face--bottom">нижняя</div>
    </div>
  </div>
  <p>
    <label>
      перспектива
      <input class="perspective-range" type="range" min="1" max="1000" value="400" data-units="px" />
    </label>
  </p>
  <p>
    <label>
      точка схода по оси X
      <input class="origin-x-range" type="range" min="0" max="100" value="50" data-units="%" />
    </label>
  </p>
  <p>
    <label>
      точка схода по оси Y
      <input class="origin-y-range" type="range" min="0" max="100" value="50" data-units="%" />
    </label>
  </p>
  <p>
    <label>
      Крутить куб
      <input class="spin-cube-checkbox" type="checkbox" />
    </label>
  </p>
  <p>
    <label>
      Видимая задняя грань
      <input class="backface-checkbox" type="checkbox" checked />
    </label>
  </p>
</div>

{% include edit-codepen.html pen_slug="bMqZmr" %}

* * *

[**Далее: Функции 3D-трансформаций &rarr;**](3d-transform-functions)
