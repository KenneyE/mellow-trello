# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#  session_token   :string(255)
#

class User < ActiveRecord::Base
  attr_reader :password
  validates :email, :password_digest, presence: true
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  validates :session_token, :presence => true, :uniqueness => true
  validates :email, uniqueness: true

  before_validation :ensure_session_token

  has_many :board_assignments, inverse_of: :user
  has_many :boards,
    through: :board_assignments,
    source: :board,
    inverse_of: :members

  has_many :card_assignments, inverse_of: :user
  has_many :cards, through:
    :card_assignments,
    source: :card,
    inverse_of: :users

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user.try(:is_password?, password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def password=(unencrypted_password)
    if unencrypted_password.present?
      @password = unencrypted_password
      self.password_digest = BCrypt::Password.create(unencrypted_password)
    end
  end

  def is_password?(unencrypted_password)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def as_json(options = {})
    super(options.merge({ except: :password_digest, include: :cards }))
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
