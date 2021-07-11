class MakeSlugNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :polls, :slug, false
  end
end
