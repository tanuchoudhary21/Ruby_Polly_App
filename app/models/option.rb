class Option < ApplicationRecord
    belongs_to :poll
    validates :option, presence: true, length: { maximum: 50 }
end