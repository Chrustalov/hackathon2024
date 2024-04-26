class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :city
      t.string :about_me
      t.string :avatar
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
