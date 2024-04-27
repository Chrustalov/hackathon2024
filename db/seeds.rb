first_names = %w[Nazar Ivan Oleksiy Vasyl Sasha]
last_names = %w[Oshkosh Zoro Khrustalov Shpytchuk Shemberko]
emails = %w[nazar@gmail.com ivan@gmail.com oleksiy@gmail.com vasyl@gmail.com sasha@gmail.com]
phone_numbers = %w[380123456789]
cities = %w[Lviv, Kyiv, Vinnytsia, Zhytomur, Odessa]
cities_ukraine = [
  "Київ",
  "Харків",
  "Одеса",
  "Дніпро",
  "Донецьк",
  "Запоріжжя",
  "Львів",
  "Кривий Ріг",
  "Миколаїв",
  "Маріуполь",
  "Вінниця",
  "Херсон",
  "Полтава",
  "Чернігів",
  "Черкаси",
  "Житомир",
  "Суми",
  "Рівне",
  "Горлівка",
  "Івано-Франківськ",
  "Кам'янець-Подільський",
  "Кропивницький",
  "Тернопіль",
  "Луцьк",
]


5.times do |i|
  user = User.create(
    email: emails[i],
    role: [0, 1].sample,
    password: '12345678aA',
    password_confirmation: '12345678aA'
  )

  Profile.create(
    first_name: first_names[i],
    last_name: last_names[i],
    phone_number: phone_numbers[0],
    city: cities[i],
    about_me: 'I am good person',
    avatar: File.open('app/assets/avatar.png'),
    user_id: user.id
  )
end

24.times do |i|
  Tag.create(name: cities_ukraine[i])
end

20.times do
  Request.create(title: 'Need help',
                 body: 'Heeeelppp',
                 photo: File.open('app/assets/help_me.jpeg'),
                 user_id: rand(1..5),
                 tag_ids: Array.new(rand(5)) { rand(1...24) })
end
