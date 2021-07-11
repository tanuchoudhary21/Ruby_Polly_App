class AddUniqueIndexForSlug < ActiveRecord::Migration[6.1]
  def change
    add_index :polls, :slug, unique: true
  end
end
