# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text
#  rank        :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#  list_id     :integer
#

class Card < ActiveRecord::Base
  validates :title, :rank, :list, presence: true

  belongs_to :list
  has_one :board, through: :list
  has_many :todo_items, inverse_of: :card

  has_many :card_assignments, inverse_of: :card
  has_many :users, through: :card_assignments, source: :user, inverse_of: :cards

  accepts_nested_attributes_for :todo_items
end
