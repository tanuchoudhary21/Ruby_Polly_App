class Poll < ApplicationRecord
    validates :title, presence: true, length: { maximum: 150 }
end