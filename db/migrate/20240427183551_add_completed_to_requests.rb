class AddCompletedToRequests < ActiveRecord::Migration[7.1]
  def change
    add_column :requests, :completed, :boolean, default: false
  end
end
