class RemoveSlugFromPolls < ActiveRecord::Migration[6.1]
  def change
    remove_column :polls, :slug, :string
  end
end
