document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.textContent = 'Меню';

    const nav = document.querySelector('nav');
    nav.insertBefore(menuToggle, nav.firstChild);

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    const menuLinks = nav.querySelectorAll('ul li a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('nav ul li a');
    let currentSectionIndex = 0;
    let isScrolling = false;
    let isNavigating = false;  // Флаг для отслеживания навигации через меню

    // Функция для установки активной секции
    const setActiveSection = (index) => {
        navLinks.forEach((link, i) => {
            link.classList.toggle('active', i === index);
        });
    };

    // Функция для блокировки/разблокировки прокрутки
    const toggleScrolling = (enable) => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (enable) {
            document.body.style.overflowY = ''; // Включаем прокрутку
            document.body.style.paddingRight = '0rem'; // Убираем фиксированную ширину

        } else {
            document.body.style.overflowY = 'hidden'; // Отключаем прокрутку
            document.body.style.paddingRight = `${scrollBarWidth/16}rem`; // Фиксируем ширину
        }
    };

    // Обработчик для нажатий в меню
    navLinks.forEach((link, index) => {
            link.addEventListener('click', (event) => {
            if (currentSectionIndex !== index)
            {
                event.preventDefault();
                isNavigating = true;
                isScrolling = true; // Блокируем колесико при навигации через меню
                currentSectionIndex = index;
                toggleScrolling(false); // Отключаем прокрутку
                setActiveSection(currentSectionIndex);
                sections[index].scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    isNavigating = false;
                    isScrolling = false; // Разблокируем колесико после завершения прокрутки
                    toggleScrolling(true); // Включаем прокрутку после завершения
                }, 700); // Время анимации прокрутки
            }
        });
    });

    // Intersection Observer для управления прокруткой секций
    const observerOptions = {
        root: null,
        threshold: 0.1 // Секция считается видимой на 10%
    };

    const observerCallback = (entries) => {
        if (!isNavigating) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isScrolling) {
                    const index = Array.from(sections).indexOf(entry.target);
                    if (index !== currentSectionIndex) {
                        currentSectionIndex = index;
                        setActiveSection(currentSectionIndex);
                        isNavigating = true;
                        isScrolling = true;
                        toggleScrolling(false);
                        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                            isNavigating = false;
                            isScrolling = false;
                            toggleScrolling(true);
                        }, 500); // Задержка для завершения анимации
                    }
                }
            });
        }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(element => {
        observer.observe(element);
    });

    // Начальная активация первой секции
    setActiveSection(currentSectionIndex);

    window.addEventListener('scroll', () => {
        console.log(currentSectionIndex)
        if (!isNavigating) {
            const currentScroll = window.scrollY + window.innerHeight;
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (currentScroll >= sectionTop && currentScroll <= sectionBottom) {
                    if (index ==  3 && currentSectionIndex === 4) {
                        currentSectionIndex = index;
                        setActiveSection(currentSectionIndex);
                    }
                }
            });
        }   
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const imagePaths = [
        'images/airport.jpg',
        'images/all_mine.jpg',
        'images/camping.jpg',
        'images/coffe.jpg',
        'images/eating.jpg',
        'images/family.jpg',
        'images/flight.jpg',
        'images/fredy.jpg',
        'images/hospital.jpg',
        'images/jeck.jpg',
        'images/london.jpg',
        'images/may.jpg',
        'images/mountains.jpg',
        'images/mvp.jpg',
        'images/new_year.jpg',
        'images/norse.jpg',
        'images/pizza.jpg',
        'images/power.jpg',
        'images/presintation.jpg',
        'images/puppy.jpg',
        'images/sea.jpg',
        'images/see_you.jpg',
        'images/space.jpg',
        'images/spb_wibe.jpg',
        'images/tech_inspection.jpg',
        'images/unity.jpg'
    ];

    const imageDescriptions = [
        '"Первый раз на самалёте". Домодедово. 2022 год.',
        '"В центре лабиринта". Полуостров Рыбачий. 2022 год.',
        '"Жизнь в палатках, на природе". Полуостров Рыбачий. 2022 год.',
        '"Кофе, как смысл жизни". Москва. 2019 год.',
        '"Безграничные просторы и вкусный батончик". Полуостров Рыбачий. 2022 год.',
        '"Не один котик не пострадал". Протвино. 2022 год.',
        '"На вершине горы". Полуостров Рыбачий. 2022 год.',
        '"С мишкой Фреди". Полуостров Рыбачий. 2022 год.',
        '"В больнице". Протвино. 2018 год.',
        '"Сдал на права!". Обнинск 2023 год.',
        '"Лондон против всех!". Санкт-Питербург. 2022 год.',
        '"Майские праздники". Дача. 2023 год.',
        '"Покоряем вершины". Полуостров Рыбачий. 2022 год.',
        '"Золотая медаль". Протвино. 2021 год.',
        '"Новогоднее настроение". Протвино. 2017 год.',
        '"Это ночь!". Мурманск. 2022 год.',
        '"Самый северный мояк России". Полуостров Рыбачий. 2022 год.',
        '"Лесной спорт". Дачи. 2023 год.',
        '"Перспектива". Полуостров Рыбачий. 2022 год.',
        '"Котики!" Протвино. 2019 год.',
        '"На курорте". Джубга. 2018 год.',
        '"Морские очки". Полуостров Рыбачий. 2022 год.',
        '"Смотрю в будущее". Полуостров Рыбачий. 2022 год.',
        '"Зимний дворец". Санкт-Питербург. 2022 год.',
        '"Гараж - второй дом". Протвино. 2024 год.',
        '"Баланс во всём". Полуостров Рыбачий. 2022 год.'
    ];

    const largePhoto = document.getElementById('largePhoto');
    let slideTimer;
    const slideInterval = 5000; // Интервал для автоматической смены

    const thumbnailsContainer = document.getElementById('thumbnails');
    const preloadContainer = document.createElement('div');
    preloadContainer.style.display = 'none';
    document.body.appendChild(preloadContainer);

    const visibleThumbnails = 7; // количество видимых миниатюр
    let currentIndex = 0;
    thumbnailHeight = 6.875;

    let isAnimating = false;

    const updateThumbnailHeight = () => {
        if (window.matchMedia("(max-width: 500px)").matches) {
            thumbnailHeight = 4.95; // Значение в rem для небольших устройств
        } else if (window.matchMedia("(max-width: 768px)").matches) {
            thumbnailHeight = 5.5; // Значение в rem для средних устройств
        } else {
            thumbnailHeight = 6.875; // Значение по умолчанию для больших устройств
        }
    };

    window.addEventListener('resize', updateThumbnailHeight);
    updateThumbnailHeight(); // Установка начального значения

    // Функция для выбора случайного изображения
    const getRandomIndex = () => {
        const randomIndex = Math.floor(Math.random() * imagePaths.length);
        return randomIndex;
    };

    // Функция для смены главного изображения
    const updateMainPhoto = () => {
        const index = getRandomIndex();
        largePhoto.style.opacity = 0;
        photoText.style.opacity = 0;

        setTimeout(() => {
            largePhoto.src = imagePaths[index];
            photoText.textContent = imageDescriptions[index];
            largePhoto.style.opacity = 1;
            photoText.style.opacity = 1;
        }, 500); // время, совпадающее с длительностью transition в CSS
    };

     // Запуск интервала смены изображений
     const startSlideShow = (delay) => {
        clearInterval(slideTimer); // Очищаем существующий интервал
        slideTimer = setInterval(updateMainPhoto, delay); // Устанавливаем новый интервал
    };

    function preloadImages() {
        imagePaths.forEach(path => {
            const img = new Image();
            img.src = path;
            preloadContainer.appendChild(img);
        });
    }

    function renderThumbnails() {
        thumbnailsContainer.innerHTML = ''; // очищаем контейнер

        const thumbnailsWrapper = document.createElement('div');
        thumbnailsWrapper.classList.add('thumbnail-container');

        // Показываем только видимые миниатюры
        for (let i = 0; i <= visibleThumbnails + 1; i++) {
            const imgIndex = (currentIndex + i + imagePaths.length) % imagePaths.length;
            const img = document.createElement('img');
            img.src = imagePaths[imgIndex];
            img.alt = 'Thumbnail';
            img.className = 'thumb';
            img.onclick = () => changePhoto(imgIndex);
            thumbnailsWrapper.appendChild(img);
        }

        thumbnailsContainer.appendChild(thumbnailsWrapper);
    }

    function updateThumbnails(direction) {
        if (!isAnimating)
        {
            isAnimating = true;

            currentIndex = (currentIndex + direction + imagePaths.length) % imagePaths.length;
    
            const thumbnailsWrapper = thumbnailsContainer.querySelector('.thumbnail-container');
            if (thumbnailsWrapper) {
                thumbnailsWrapper.classList.add('slide-animation');
                thumbnailsWrapper.style.transform = `translateY(${-direction * (thumbnailHeight + 0.3125)}rem)`;
                
                setTimeout(() => {
                    renderThumbnails();
                    isAnimating = false;
                }, 500); // время, совпадающее с длительностью transition в CSS
            }
        }
    }
        
    document.getElementById('prev').addEventListener('click', function() {
        updateThumbnails(-2);
    });

    document.getElementById('next').addEventListener('click', function() {
        updateThumbnails(2);
    });

    function changePhoto(index) {
        clearInterval(slideTimer);

        const largePhoto = document.getElementById('largePhoto');
        const photoText = document.getElementById('photoText');

        largePhoto.style.opacity = 0;
        photoText.style.opacity = 0;

        setTimeout(() => {
            largePhoto.src = imagePaths[index];
            photoText.textContent = imageDescriptions[index];
            largePhoto.style.opacity = 1;
            photoText.style.opacity = 1;
        }, 500); // время, совпадающее с длительностью transition в CSS

        // Перезапускаем таймер с задержкой после выбора
        setTimeout(() => startSlideShow(slideInterval), slideInterval);
    }

    // Устанавливаем начальное изображение и запускаем интервал
    updateMainPhoto();
    startSlideShow(slideInterval);

    preloadImages();
    renderThumbnails();
});

document.addEventListener('DOMContentLoaded', function() {
    const languageDetails = {
        "Python": "Знания: Основы Python. Библиотеки numpy и pandas. Основы машинного обучения. Основы тестирования, библиотеки pytest, requests, selenium, allure. Основы создания телеграм-ботов.<br>Проекты: Создана экспертная система, в качестве совместного проекта. Пишу диплом на Python.",
        "C++": "Знания: Основы C++. ООП в C++.<br>Проекты: Консольный калькулятор производных.",
        "html/JavaScrupt": "Знания: Основы html/JavaScrupt. Обычная и svg графика.<br>Проекты: Интерполирование функции по точкам. Данный сайт.",
        "Java": "Знания: Основы Java.<br>Проекты: Приложение для анализа и заказов из магазинов (совместный проект).",
        "SQL": "Знания: Основы создания БД и запросов на Postgres.<br>Проекты: Собственная база данных для файлов в каталоге. База данных для проекта на Java.",
        "R": "Знания: Основы R. Анализ данных.<br>Проекты: Реализовано множество алгоритмов для Распознавания образов или Численных методов.",
    };

    const tiles = document.querySelectorAll('.language-tile');
    const modal = document.getElementById('modal');
    const languageName = document.getElementById('language-name');
    const languageDetailsElement = document.getElementById('language-details');
    const closeButton = document.querySelector('.close-button');

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const language = tile.getAttribute('data-language');
            languageName.textContent = language;
            languageDetailsElement.innerHTML = languageDetails[language];
            modal.style.display = 'flex'; 
            setTimeout(() => modal.classList.add('show'), 10);
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
});