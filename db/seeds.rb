# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Server.destroy_all
Serversubscription.destroy_all
Channel.destroy_all
Message.destroy_all

ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

User.create(username: 'demoUser', password: 'asdfasdf', email: 'demoEmail@demo.com')
User.create(username: 'Lucio', password: 'asdfasdf', email: 'Lucio@demo.com')
User.create(username: 'Tracer', password: 'asdfasdf', email: 'Tracer@demo.com')
User.create(username: 'Reaper', password: 'asdfasdf', email: 'Reaper@demo.com')
User.create(username: 'Mercy', password: 'asdfasdf', email: 'Mercy@demo.com')
User.create(username: 'Genji', password: 'asdfasdf', email: 'Genji@demo.com')
User.create(username: 'Hanzo', password: 'asdfasdf', email: 'Hanzo@demo.com')

Server.create(name: 'Overwatch', owner_id: 1)
Server.create(name: 'Pokemon', owner_id: 1)
Server.create(name: 'Kingdom Hearts', owner_id: 2)
Server.create(name: 'Assassin Creed', owner_id: 3)

Serversubscription.create(user_id: 1, server_id: 1)
Serversubscription.create(user_id: 2, server_id: 1)
Serversubscription.create(user_id: 3, server_id: 1)
Serversubscription.create(user_id: 4, server_id: 1)
Serversubscription.create(user_id: 5, server_id: 1)
Serversubscription.create(user_id: 6, server_id: 1)
Serversubscription.create(user_id: 7, server_id: 1)
Serversubscription.create(user_id: 1, server_id: 2)
Serversubscription.create(user_id: 2, server_id: 2)
Serversubscription.create(user_id: 3, server_id: 2)
Serversubscription.create(user_id: 4, server_id: 2)
Serversubscription.create(user_id: 1, server_id: 3)
Serversubscription.create(user_id: 1, server_id: 3)
Serversubscription.create(user_id: 2, server_id: 3)
Serversubscription.create(user_id: 4, server_id: 3)
Serversubscription.create(user_id: 6, server_id: 3)
Serversubscription.create(user_id: 7, server_id: 3)
Serversubscription.create(user_id: 1, server_id: 4)
Serversubscription.create(user_id: 3, server_id: 4)
Serversubscription.create(user_id: 5, server_id: 4)
Serversubscription.create(user_id: 6, server_id: 4)
Serversubscription.create(user_id: 7, server_id: 4)

Channel.create(name: 'Blackwatch')
Channel.create(name: "Doomfist's Room")
Channel.create(name: 'Pallet Town')
Channel.create(name: "Viridian Forest")
Channel.create(name: 'Pewter City')
Channel.create(name: "Cinnabar Island")
Channel.create(name: 'Agrabah')
Channel.create(name: "Castle Oblivion")
Channel.create(name: 'Neverland')
Channel.create(name: "Destiny Island")
Channel.create(name: 'New York')
Channel.create(name: "Florence")
Channel.create(name: 'Grand Temple')
Channel.create(name: "Masyaf")

Serverchannel.create(channel_id: 1, server_id: 1)
Serverchannel.create(channel_id: 2, server_id: 1)
Serverchannel.create(channel_id: 3, server_id: 2)
Serverchannel.create(channel_id: 4, server_id: 2)
Serverchannel.create(channel_id: 5, server_id: 2)
Serverchannel.create(channel_id: 6, server_id: 2)
Serverchannel.create(channel_id: 7, server_id: 3)
Serverchannel.create(channel_id: 8, server_id: 3)
Serverchannel.create(channel_id: 9, server_id: 3)
Serverchannel.create(channel_id: 10, server_id: 3)
Serverchannel.create(channel_id: 11, server_id: 4)
Serverchannel.create(channel_id: 12, server_id: 4)
Serverchannel.create(channel_id: 13, server_id: 4)

Message.create(body: "First Message", author_id: 1, channel_id: 1)
Message.create(body: "First Message", author_id: 1, channel_id: 2)
Message.create(body: "First Message", author_id: 1, channel_id: 3)
Message.create(body: "First Message", author_id: 1, channel_id: 4)
Message.create(body: "First Message", author_id: 1, channel_id: 5)
Message.create(body: "First Message", author_id: 1, channel_id: 6)
Message.create(body: "First Message", author_id: 1, channel_id: 7)
Message.create(body: "First Message", author_id: 1, channel_id: 8)
Message.create(body: "First Message", author_id: 1, channel_id: 9)
Message.create(body: "First Message", author_id: 1, channel_id: 10)
Message.create(body: "First Message", author_id: 1, channel_id: 11)
Message.create(body: "First Message", author_id: 1, channel_id: 12)
Message.create(body: "First Message", author_id: 1, channel_id: 13)
Message.create(body: "First Message", author_id: 1, channel_id: 14)
Message.create(body: "Second!", author_id: 2, channel_id: 1)
Message.create(body: "Me third", author_id: 3, channel_id: 1)
