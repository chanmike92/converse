class Server < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :owner_id, presence: true
  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :owner,
    class_name: :User,
    primary_key: :id,
    foreign_key: :owner_id

  has_many :subscriptions, dependent: :destroy,
    class_name: :Serversubscription,
    primary_key: :id,
    foreign_key: :server_id

  has_many :channels, dependent: :destroy,
    class_name: :Channel,
    primary_key: :id,
    foreign_key: :server_id

  has_many :messages,
    through: :channels,
    source: :messages

  has_many :subscribed_users, dependent: :destroy,
    through: :subscriptions,
    source: :user

  def self.search(query)
    self.where("similarity(name, ?) > 0.3 AND ", query)
  end

  def iconName
    result = "";
    self.name.split(' ').each do |word|
      result += word[0]
    end
    return result;
  end


end
