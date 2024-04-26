class AddImageToRequests < ActiveRecord::Migration[7.1]
  def change
    add_column :requests, :photo, :string
  end
end
