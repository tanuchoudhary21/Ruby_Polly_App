class Vote < ApplicationRecord
    belongs_to :option, optional: true
    belongs_to :user
    belongs_to :poll
end 